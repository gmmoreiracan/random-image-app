import express from 'express';
import axios from 'axios';
import { context, setSpan, SpanKind, trace } from '@opentelemetry/api';
import { NodeTracerProvider } from '@opentelemetry/node';
import { SimpleSpanProcessor } from '@opentelemetry/tracing';
import { OTLPExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { HoneycombExporter } from '@honeycombio/opentelemetry-node';

// Initialize OpenTelemetry
const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(new HoneycombExporter({ serviceName: 'word-suggestion-app' ,apiKey: process.env.HONEYCOMB_API_KEY})));
provider.register();

const tracer = trace.getTracer('default');
const app = express();

app.get('/', async (req, res) => {
    const parentSpan = tracer.startSpan('main');
    try {
        const response = await context.with(setSpan(context.active(), parentSpan), async () => {
            const span = tracer.startSpan('axios request', { kind: SpanKind.CLIENT });
            const response = await axios.get('https://random-word.ryanrk.com/api/en/word/random/5');
            span.end();
            return response;
        });
        const keywords = response.data;
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.send({ keywords });
    } catch (error) {
        console.error('Error fetching keywords:', error);
        res.status(500).send('Error fetching keywords');
    } finally {
        parentSpan.end();
    }
});

app.listen(3000, () => console.log('Random word suggestion app is running on port 3000'));