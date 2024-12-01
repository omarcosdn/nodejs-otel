import {NodeSDK} from '@opentelemetry/sdk-node';
import {diag, DiagConsoleLogger, DiagLogLevel} from '@opentelemetry/api';
import {OTLPTraceExporter} from '@opentelemetry/exporter-trace-otlp-grpc';
import {CompressionAlgorithm} from '@opentelemetry/otlp-exporter-base';
import {HttpInstrumentation} from '@opentelemetry/instrumentation-http';
import {PgInstrumentation} from '@opentelemetry/instrumentation-pg';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

const sdk = new NodeSDK({
  serviceName: 'post-service',
  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4317',
    compression: CompressionAlgorithm.GZIP,
  }),
  instrumentations: [new HttpInstrumentation(), new PgInstrumentation()],
});

sdk.start();