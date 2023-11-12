import type { NPMAuditReportV2 } from "audit-types";

export type Severity = "critical" | "high" | "moderate" | "low" | "info";

const getHighestSeverity = (vulnerabilities: NPMAuditReportV2.Advisory[]) => {
  const severityCounts = {
    critical: 0,
    high: 0,
    moderate: 0,
    low: 0,
    info: 0,
  };

  vulnerabilities.forEach(({ severity }) => {
    severityCounts[severity]++;
  });

  return Object.entries(severityCounts).find(([, value]) => value)?.[0];
};

const audit = (auditReport: string) => {
  const {
    auditReportVersion,
    vulnerabilities,
    metadata,
  }: NPMAuditReportV2.Audit = JSON.parse(auditReport);
  const vulnerabilitiesList = Object.values(vulnerabilities);
  const highestSeverityLevel = getHighestSeverity(vulnerabilitiesList);
  const highestSeverityList = vulnerabilitiesList
    .filter(({ severity }) => severity === highestSeverityLevel)
    .reduce<Record<string, NPMAuditReportV2.Advisory>>((acc, cur) => {
      acc[cur.name] = cur;
      return acc;
    }, {});

  return JSON.stringify(
    {
      auditReportVersion,
      vulnerabilities: highestSeverityList,
      metadata,
    },
    null,
    2
  );
};

export default audit;
