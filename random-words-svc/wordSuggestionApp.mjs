import express from 'express';
import axios from 'axios';
import otelAPI from '@opentelemetry/api';
import otelNode from '@opentelemetry/node';
import otelTracing from '@opentelemetry/tracing';
import otelExporter from '@opentelemetry/exporter-trace-otlp-http';
import honeyOtel from '@honeycombio/opentelemetry-node';


const  { context, setSpan, SpanKind, trace } = otelAPI;
const {NodeTracerProvider} = otelNode;
const {SimpleSpanProcessor} = otelTracing;
const {OTLPTraceExporter} = otelExporter;
//const { HoneycombExporter } = honeyOtel;

// Initialize OpenTelemetry
const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter({ serviceName: 'word-suggestion-app' ,apiKey: process.env.HONEYCOMB_API_KEY})));
provider.register();

const tracer = trace.getTracer('default');
const app = express();

app.get('/', async (req, res) => {
    const parentSpan = tracer.startSpan('main');
    try {
        const response = await context.with(trace.setSpan(context.active(), parentSpan), async () => {
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