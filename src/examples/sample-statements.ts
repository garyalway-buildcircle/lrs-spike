import { XAPIStatement } from '../types/xapi';

export const sampleStatements: XAPIStatement[] = [
  {
    actor: {
      name: "John Doe",
      mbox: "mailto:john.doe@enterprise.com"
    },
    verb: {
      id: "http://adlnet.gov/expapi/verbs/experienced",
      display: {
        "en-US": "experienced"
      }
    },
    object: {
      id: "http://enterprise.com/training/cybersecurity-101",
      definition: {
        name: {
          "en-US": "Cybersecurity Fundamentals Training"
        },
        description: {
          "en-US": "Basic cybersecurity training module covering threat identification and response procedures"
        },
        type: "http://adlnet.gov/expapi/activities/course"
      }
    },
    context: {
      instructor: {
        name: "Security Team",
        mbox: "mailto:security@enterprise.com"
      },
      contextActivities: {
        category: [
          {
            id: "http://enterprise.com/training/security-category",
            definition: {
              name: {
                "en-US": "Security Training"
              }
            }
          }
        ]
      }
    },
    timestamp: new Date().toISOString()
  },
  {
    actor: {
      name: "Jane Smith",
      mbox: "mailto:jane.smith@enterprise.com"
    },
    verb: {
      id: "http://adlnet.gov/expapi/verbs/completed",
      display: {
        "en-US": "completed"
      }
    },
    object: {
      id: "http://enterprise.com/training/compliance-quiz",
      definition: {
        name: {
          "en-US": "Compliance Assessment Quiz"
        },
        description: {
          "en-US": "Assessment quiz covering company compliance policies and procedures"
        },
        type: "http://adlnet.gov/expapi/activities/assessment"
      }
    },
    result: {
      completion: true,
      success: true,
      score: {
        scaled: 0.85,
        raw: 17,
        min: 0,
        max: 20
      },
      duration: "PT15M30S"
    },
    context: {
      contextActivities: {
        category: [
          {
            id: "http://enterprise.com/training/compliance-category",
            definition: {
              name: {
                "en-US": "Compliance Training"
              }
            }
          }
        ]
      }
    },
    timestamp: new Date().toISOString()
  },
  {
    actor: {
      name: "Mike Johnson",
      mbox: "mailto:mike.johnson@enterprise.com"
    },
    verb: {
      id: "http://adlnet.gov/expapi/verbs/attempted",
      display: {
        "en-US": "attempted"
      }
    },
    object: {
      id: "http://enterprise.com/simulation/incident-response",
      definition: {
        name: {
          "en-US": "Incident Response Simulation"
        },
        description: {
          "en-US": "Interactive simulation for practicing incident response procedures"
        },
        type: "http://adlnet.gov/expapi/activities/simulation"
      }
    },
    result: {
      completion: false,
      success: false,
      score: {
        scaled: 0.45,
        raw: 9,
        min: 0,
        max: 20
      },
      duration: "PT25M12S"
    },
    context: {
      instructor: {
        name: "Incident Response Team",
        mbox: "mailto:incident-response@enterprise.com"
      },
      contextActivities: {
        category: [
          {
            id: "http://enterprise.com/training/hands-on-category",
            definition: {
              name: {
                "en-US": "Hands-on Training"
              }
            }
          }
        ]
      }
    },
    timestamp: new Date().toISOString()
  }
];

export const enterpriseActivityStatement: XAPIStatement = {
  actor: {
    name: "Sarah Wilson",
    account: {
      homePage: "https://enterprise.com/employees",
      name: "sarah.wilson"
    }
  },
  verb: {
    id: "http://adlnet.gov/expapi/verbs/mastered",
    display: {
      "en-US": "mastered"
    }
  },
  object: {
    id: "http://enterprise.com/competencies/project-management",
    definition: {
      name: {
        "en-US": "Project Management Competency"
      },
      description: {
        "en-US": "Competency in project management methodologies and tools"
      },
      type: "http://adlnet.gov/expapi/activities/competency"
    }
  },
  result: {
    completion: true,
    success: true,
    score: {
      scaled: 0.92
    }
  },
  context: {
    contextActivities: {
      category: [
        {
          id: "http://enterprise.com/competencies/leadership-track",
          definition: {
            name: {
              "en-US": "Leadership Development Track"
            }
          }
        }
      ],
      parent: [
        {
          id: "http://enterprise.com/programs/management-certification",
          definition: {
            name: {
              "en-US": "Management Certification Program"
            }
          }
        }
      ]
    }
  },
  timestamp: new Date().toISOString()
};
