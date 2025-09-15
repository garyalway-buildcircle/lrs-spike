# SQL LRS Enterprise Demo

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

## Analytics and Reporting

### Direct Database Access
SQL LRS stores data in PostgreSQL, enabling direct SQL queries:

```sql
-- Connect to PostgreSQL
docker exec -it sql-lrs-demo-postgres-1 psql -U lrsql_user -d lrsql

-- Query statements by verb
SELECT * FROM xapi_statement WHERE verb_id = 'http://adlnet.gov/expapi/verbs/completed';

-- Analyze completion rates by activity
SELECT 
  activity_id,
  COUNT(*) as attempts,
  SUM(CASE WHEN result_completion = true THEN 1 ELSE 0 END) as completions
FROM xapi_statement 
GROUP BY activity_id;
```

## API Reference

### SQLLRSClient Methods

#### `healthCheck(): Promise<boolean>`
Check if SQL LRS is running and accessible.

#### `storeStatement(statement: XAPIStatement): Promise<string[]>`
Store a single xAPI statement.

#### `storeStatements(statements: XAPIStatement[]): Promise<string[]>`
Store multiple xAPI statements in a batch.

#### `getStatements(params?): Promise<any>`
Retrieve statements with optional filtering:
- `agent`: Filter by actor
- `verb`: Filter by verb ID
- `activity`: Filter by activity ID
- `since`/`until`: Time range filtering
- `limit`: Maximum number of results

#### `about(): Promise<any>`
Get LRS information and capabilities.

## Resources

- [SQL LRS Documentation](https://yetanalytics.github.io/lrsql/)
- [xAPI Specification](https://github.com/adlnet/xAPI-Spec)
- [SQL LRS GitHub](https://github.com/yetanalytics/lrsql)
- [Yet Analytics](https://www.yetanalytics.com/)
