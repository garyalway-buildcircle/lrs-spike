# SQL LRS Enterprise Demo

## Overview

This repository demonstrates SQL LRS integration for enterprise learning analytics, supporting RFC 190 - Learn Platform - LRSQL as LRS. The implementation showcases xAPI statement patterns, Docker deployment, and PostgreSQL integration for business intelligence.

## Enterprise Use Cases Demonstrated

### 1. Employee Training Tracking
```typescript
{
  actor: { name: "John Doe", mbox: "mailto:john.doe@enterprise.com" },
  verb: { id: "http://adlnet.gov/expapi/verbs/experienced" },
  object: { id: "http://enterprise.com/training/cybersecurity-101" }
}
```

### 2. Compliance Assessment Results
```typescript
{
  actor: { name: "Jane Smith", mbox: "mailto:jane.smith@enterprise.com" },
  verb: { id: "http://adlnet.gov/expapi/verbs/completed" },
  object: { id: "http://enterprise.com/training/compliance-quiz" },
  result: { completion: true, success: true, score: { scaled: 0.85 } }
}
```

### 3. Competency Mastery Records
```typescript
{
  actor: { name: "Sarah Wilson" },
  verb: { id: "http://adlnet.gov/expapi/verbs/mastered" },
  object: { id: "http://enterprise.com/competencies/project-management" }
}
```
## Enterprise Integration Patterns

### 1. Learning Management System Integration
```typescript
// Track course completions from LMS
const courseCompletion = {
  actor: { mbox: "mailto:employee@company.com" },
  verb: { id: "http://adlnet.gov/expapi/verbs/completed" },
  object: { id: "https://lms.company.com/courses/security-awareness" },
  result: { completion: true, score: { scaled: 0.92 } }
};
await client.storeStatement(courseCompletion);
```

### 2. Performance Support Systems
```typescript
// Track help system usage
const helpAccessed = {
  actor: { mbox: "mailto:employee@company.com" },
  verb: { id: "http://adlnet.gov/expapi/verbs/experienced" },
  object: { id: "https://help.company.com/procedures/incident-response" }
};
await client.storeStatement(helpAccessed);
```

### 3. Competency Management
```typescript
// Record competency achievements
const competencyMastered = {
  actor: { mbox: "mailto:employee@company.com" },
  verb: { id: "http://adlnet.gov/expapi/verbs/mastered" },
  object: { id: "https://competencies.company.com/leadership/team-management" }
};
await client.storeStatement(competencyMastered);
```

## Resources

- [SQL LRS Documentation](https://yetanalytics.github.io/lrsql/)
- [xAPI Specification](https://github.com/adlnet/xAPI-Spec)
- [SQL LRS GitHub](https://github.com/yetanalytics/lrsql)
- [Yet Analytics](https://www.yetanalytics.com/)
