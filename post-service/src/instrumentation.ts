import { NodeSDK } from '@opentelemetry/sdk-node';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { CompressionAlgorithm } from '@opentelemetry/otlp-exporter-base';
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

const sdk = new NodeSDK({
    serviceName: 'post-api',
    traceExporter: new OTLPTraceExporter({
        url: 'http://localhost:4317',
        compression: CompressionAlgorithm.GZIP,
    }),
    instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();