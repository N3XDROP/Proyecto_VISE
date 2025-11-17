// src/instrumentation.ts

import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import dotenv from "dotenv";

dotenv.config();

const traceExporter = new OTLPTraceExporter({
  url: `https://${process.env.AXIOM_DOMAIN}/v1/traces`,
  headers: {
    Authorization: `Bearer ${process.env.AXIOM_TOKEN}`,
    "X-Axiom-Dataset": process.env.AXIOM_DATASET || "",
  },
});

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: "vise-api",
});

const sdk = new NodeSDK({
  resource,
  traceExporter: traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
console.log("📡 OpenTelemetry initialized");

console.log("⚡ OTel TRACE EXPORTER READY →", {
  url: `https://${process.env.AXIOM_DOMAIN}/v1/traces`,
  dataset: process.env.AXIOM_DATASET
});
