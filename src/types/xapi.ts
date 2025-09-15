export interface Actor {
  name?: string;
  mbox?: string;
  mbox_sha1sum?: string;
  openid?: string;
  account?: {
    homePage: string;
    name: string;
  };
}

export interface Verb {
  id: string;
  display?: {
    [languageCode: string]: string;
  };
}

export interface Activity {
  id: string;
  definition?: {
    name?: {
      [languageCode: string]: string;
    };
    description?: {
      [languageCode: string]: string;
    };
    type?: string;
  };
}

export interface XAPIStatement {
  id?: string;
  actor: Actor;
  verb: Verb;
  object: Activity;
  result?: {
    score?: {
      scaled?: number;
      raw?: number;
      min?: number;
      max?: number;
    };
    completion?: boolean;
    success?: boolean;
    duration?: string;
  };
  context?: {
    instructor?: Actor;
    team?: Actor;
    contextActivities?: {
      parent?: Activity[];
      grouping?: Activity[];
      category?: Activity[];
      other?: Activity[];
    };
    revision?: string;
    platform?: string;
    language?: string;
  };
  timestamp?: string;
  stored?: string;
  authority?: Actor;
  version?: string;
}
