import XAPI, { Statement, Actor, Verb, Activity } from '@xapi/xapi';
import axios, { AxiosInstance } from 'axios';

export class SQLLRSClient {
  private client: any;
  private baseUrl: string;
  private axiosClient: AxiosInstance;

  constructor(baseUrl: string, username: string, password: string) {
    this.baseUrl = baseUrl;
    
    // Initialize the xAPI client with API key auth
    this.client = new XAPI({
      endpoint: `${baseUrl}/xapi/`,
      auth: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
    });

    // Keep axios client for health checks and fallback
    this.axiosClient = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'X-Experience-API-Version': '1.0.3',
        'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
      }
    });
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.axiosClient.get('/health');
      return response.status === 200;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  async storeStatement(statement: Statement): Promise<string[]> {
    try {
      const response = await this.client.sendStatement({ statement });
      return Array.isArray(response?.data) ? response.data : [response?.data || ''];
    } catch (error) {
      console.error('Failed to store statement:', error);
      throw error;
    }
  }

  async storeStatements(statements: Statement[]): Promise<string[]> {
    try {
      const response = await this.client.sendStatements({ statements });
      return Array.isArray(response?.data) ? response.data : [response?.data || ''];
    } catch (error) {
      console.error('Failed to store statements:', error);
      throw error;
    }
  }

  async getStatements(params: {
    statementId?: string;
    voidedStatementId?: string;
    agent?: string;
    verb?: string;
    activity?: string;
    registration?: string;
    related_activities?: boolean;
    related_agents?: boolean;
    since?: string;
    until?: string;
    limit?: number;
    format?: 'ids' | 'exact' | 'canonical';
    attachments?: boolean;
    ascending?: boolean;
  } = {}): Promise<any> {
    try {
      const response = await this.client.getStatements(params);
      return response?.data || response;
    } catch (error) {
      console.error('Failed to get statements:', error);
      throw error;
    }
  }

  async getActivities(activityId: string): Promise<any> {
    try {
      const response = await this.client.getActivity({ activityId });
      return response?.data || response;
    } catch (error) {
      console.error('Failed to get activities:', error);
      throw error;
    }
  }

  async getAgents(agent: string): Promise<any> {
    try {
      const parsedAgent = typeof agent === 'string' ? JSON.parse(agent) : agent;
      const response = await this.client.getAgent({ agent: parsedAgent });
      return response?.data || response;
    } catch (error) {
      console.error('Failed to get agents:', error);
      throw error;
    }
  }

  async about(): Promise<any> {
    try {
      const response = await this.client.getAbout();
      return response?.data || response;
    } catch (error) {
      console.error('Failed to get about info:', error);
      throw error;
    }
  }
}