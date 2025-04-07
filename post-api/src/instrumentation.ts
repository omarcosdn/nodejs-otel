import {NodeSDK} from '@opentelemetry/sdk-node';
import {PeriodicExportingMetricReader} from '@opentelemetry/sdk-metrics';
import {OTLPTraceExporter} from '@opentelemetry/exporter-trace-otlp-grpc';
import {resourceFromAttributes} from '@opentelemetry/resources';
import {ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION} from '@opentelemetry/semantic-conventions';
import {diag, DiagConsoleLogger, DiagLogLevel} from '@opentelemetry/api';
import {OTLPMetricExporter} from '@opentelemetry/exporter-metrics-otlp-grpc';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'post-api',
    [ATTR_SERVICE_VERSION]: '0.0.1',
  }),
  traceExporter: new OTLPTraceExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter(),
  }),
});

sdk.start();