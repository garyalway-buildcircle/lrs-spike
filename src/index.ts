import dotenv from 'dotenv';
import { SQLLRSClient } from './lib/sql-lrs-client';
import { sampleStatements, enterpriseActivityStatement } from './examples/sample-statements';

dotenv.config();

const SQL_LRS_URL = process.env.SQL_LRS_URL || 'http://localhost:9080';
const SQL_LRS_USERNAME = process.env.API_KEY || process.env.SQL_LRS_USERNAME || 'demo_key';
const SQL_LRS_PASSWORD = process.env.API_SECRET || process.env.SQL_LRS_PASSWORD || 'demo_secret';

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForLRS(client: SQLLRSClient, maxAttempts = 30): Promise<boolean> {
  console.log('Waiting for SQL LRS to be ready...');
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const isHealthy = await client.healthCheck();
      if (isHealthy) {
        console.log('SQL LRS is ready!');
        return true;
      }
    } catch (error) {
      console.log(`Attempt ${attempt}/${maxAttempts} - SQL LRS not ready yet...`);
    }
    
    if (attempt < maxAttempts) {
      await delay(2000);
    }
  }
  
  console.error('SQL LRS failed to become ready within the timeout period');
  return false;
}

async function demonstrateLRS() {
  console.log('🚀 SQL LRS Enterprise Demo Starting...');
  console.log(`Connecting to SQL LRS at: ${SQL_LRS_URL}`);

  const client = new SQLLRSClient(SQL_LRS_URL, SQL_LRS_USERNAME, SQL_LRS_PASSWORD);

  const isReady = await waitForLRS(client);
  if (!isReady) {
    console.error('❌ Could not connect to SQL LRS. Make sure it is running.');
    process.exit(1);
  }

  try {
    console.log('\n📋 Getting LRS information...');
    const aboutInfo = await client.about();
    console.log('LRS Info:', JSON.stringify(aboutInfo, null, 2));

    console.log('\n📝 Storing sample xAPI statements...');
    
    console.log('Storing individual enterprise activity statement...');
    const singleStatementIds = await client.storeStatement(enterpriseActivityStatement);
    console.log('Stored statement IDs:', singleStatementIds);

    console.log('Storing batch of training statements...');
    const batchStatementIds = await client.storeStatements(sampleStatements);
    console.log('Stored batch statement IDs:', batchStatementIds);

    await delay(1000);

    console.log('\n🔍 Retrieving statements...');
    const allStatements = await client.getStatements({ limit: 10 });
    console.log(`Retrieved ${allStatements.statements?.length || 0} statements`);
    
    if (allStatements.statements && allStatements.statements.length > 0) {
      console.log('\nSample statement:');
      console.log(JSON.stringify(allStatements.statements[0], null, 2));
    }

    console.log('\n🎯 Filtering statements by verb...');
    const completedStatements = await client.getStatements({
      verb: 'http://adlnet.gov/expapi/verbs/completed',
      limit: 5
    });
    console.log(`Found ${completedStatements.statements?.length || 0} completed statements`);

    console.log('\n👤 Filtering statements by actor...');
    const janeStatements = await client.getStatements({
      agent: JSON.stringify({
        name: "Jane Smith",
        mbox: "mailto:jane.smith@enterprise.com"
      }),
      limit: 5
    });
    console.log(`Found ${janeStatements.statements?.length || 0} statements for Jane Smith`);

    console.log('\n✅ Demo completed successfully!');
    console.log('\n🏢 Enterprise Use Cases Demonstrated:');
    console.log('• Employee training completion tracking');
    console.log('• Compliance assessment results');
    console.log('• Competency mastery records');
    console.log('• Simulation performance data');
    console.log('• Multi-criteria statement filtering');
    console.log('\n📊 Next steps: Connect your BI tools to the PostgreSQL database for analytics!');

  } catch (error) {
    console.error('❌ Demo failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  demonstrateLRS().catch(console.error);
}
