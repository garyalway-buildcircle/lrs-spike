# RFC 190 - Learn Platform - LRSQL as LRS

## Summary

This RFC establishes **SQL LRS as the standard Learning Record Store (LRS) solution** for the Learn Platform and future xAPI-compliant systems. Through systematic evaluation of open-source LRS options, we determined that SQL LRS provides superior operational characteristics, enterprise-grade reliability, and container-native deployment that align with our engineering standards.

**Engineering Standard**: All learning analytics systems requiring xAPI compliance should use SQL LRS as the standard Learning Record Store implementation.

**Recommendation**: Adopt SQL LRS as the organization-wide standard for Learning Record Store implementations.

## Background & Motivation

The Learn Platform requires an xAPI-compliant Learning Record Store to capture, store, and analyze learning activities. Technical requirements include:
- xAPI 1.0.3 compliance for learning data interoperability
- Enterprise-grade scalability and reliability
- Container-native deployment aligned with infrastructure standards
- PostgreSQL compatibility for existing data analytics pipelines
- Simple operational management and monitoring

## LRS Comparison Findings

### SQL LRS (Yet Analytics) ✅ **RECOMMENDED**

**Operational Excellence:**
- ✅ **Excellent Docker Support**: Official Docker image with complete docker-compose setup
- ✅ **Simple Deployment**: Single command deployment
- ✅ **Enterprise Ready**: PostgreSQL backend, proven at scale
- ✅ **xAPI Compliant**: Full xAPI 1.0.3 specification support
- ✅ **Analytics Ready**: Direct PostgreSQL access for BI tools
- ✅ **Well Documented**: Comprehensive documentation and examples

**Technical Stack:**
- Backend: Clojure/JVM
- Database: PostgreSQL
- Deployment: Docker/Kubernetes ready
- Health Checks: Built-in monitoring endpoints

### Learning Pool LRS (Learning Locker) ❌ **OPERATIONAL CHALLENGES**

**Setup Complexity Issues:**
- ❌ **No Official Docker Images**: `learninglocker/learninglocker2:latest` does not exist
- ❌ **Complex Architecture**: Requires MongoDB + Redis + multiple services (API + UI + Worker)
- ❌ **Manual Setup Required**: Must build from source or use unmaintained community Docker configs
- ❌ **Operational Overhead**: Multiple moving parts increase complexity and failure points
- ⚠️ **Documentation Gaps**: Setup instructions are incomplete or outdated

**Architecture Complexity:**
- Requires: MongoDB, Redis, Node.js API service, UI service, Worker service
- Multiple container orchestration required
- No simple container deployment option

### TRAX LRS (Sébastien FRAYSSE) ❌ **NO DOCKER SUPPORT**

**Deployment Limitations:**
- ❌ **No Docker Images**: No official or community Docker images available
- ❌ **Manual PHP Setup Required**: Requires PHP 8.2+, Composer, manual Laravel installation
- ❌ **Database Setup**: Manual MySQL/PostgreSQL configuration required
- ❌ **No Container Strategy**: Not designed for containerized deployment
- ⚠️ **Operational Burden**: Requires traditional server management approach

**Technical Requirements:**
- PHP 8.2 or 8.3
- Composer dependency management
- Manual Laravel application setup
- Database migration management
- Web server configuration

### Annulab LRS ❌ **ABANDONED/UNAVAILABLE**

**Investigation Results:**
- ❌ **No Documentation Found**: Website (lrsdata.com) provides no installation instructions
- ❌ **No Docker Support**: No Docker images or containerization strategy
- ❌ **No Active Development**: No GitHub repository or source code available
- ❌ **Unsupported**: Last update appears to be 2021, confirming "garbageware" assessment
- ❌ **Not Viable**: Cannot be evaluated due to lack of available resources

## Benefits (SQL LRS)

1. **Operational Simplicity**: Single command deployment and management
2. **Enterprise Grade**: PostgreSQL backend provides ACID compliance and scalability
3. **Developer Friendly**: Working examples and comprehensive API documentation
4. **Analytics Ready**: Direct SQL access for business intelligence tools
5. **Container Native**: Built for modern cloud deployment patterns
6. **Proven Technology**: Clojure/JVM stack with strong concurrency and reliability

## Drawbacks

1. **Technology Stack**: Clojure may be less familiar to team (though operationally transparent)
2. **Vendor Dependency**: Yet Analytics maintains the project (though open source)
3. **Limited UI**: Minimal administrative interface compared to Learning Locker

## Alternatives Considered

| LRS Option | Docker Support | Setup Complexity | Enterprise Ready | Status | Recommendation |
|------------|---------------|------------------|------------------|--------|----------------|
| **SQL LRS** | ✅ Excellent | ✅ Simple | ✅ Yes | ✅ Active | **RECOMMENDED** |
| Learning Pool LRS | ❌ Poor | ❌ Complex | ⚠️ Maybe | ⚠️ Complex | **NOT RECOMMENDED** |
| TRAX LRS | ❌ None | ❌ Complex | ⚠️ Maybe | ✅ Active | **NOT RECOMMENDED** |
| Annulab LRS | ❌ None | ❌ Unknown | ❌ No | ❌ Abandoned | **NOT VIABLE** |
| Watershed LRS | N/A | N/A | ✅ Yes | ✅ Active | Closed source/SaaS only |
| lrs.io | N/A | N/A | ✅ Yes | ✅ Active | Closed source/SaaS only |

## Conclusion

**SQL LRS is the clear choice** for the Learn Platform based on:

1. **Operational Excellence**: Superior container support and deployment simplicity
2. **Enterprise Readiness**: PostgreSQL backend and proven scalability
3. **Development Velocity**: Working examples allow immediate development progress
4. **Total Cost of Ownership**: Minimal operational overhead vs. complex multi-service architectures

The spike work revealed that **operational simplicity and Docker support are critical differentiators** in the LRS space. Through systematic evaluation of available open-source LRS options, we discovered:

1. **Most LRS solutions lack proper containerization support** - Critical for modern cloud deployment
2. **Complex multi-service architectures create operational overhead** - MongoDB + Redis + multiple services
3. **Abandoned projects are common in the LRS ecosystem** - Annulab LRS exemplifies this risk
4. **Manual setup requirements are prohibitive** - PHP/Laravel manual installation vs. container

**Key Finding**: The LRS market has a significant gap in **production-ready, container-native solutions**. SQL LRS stands out as the exception with enterprise-grade operational characteristics.

**Final Recommendation**: **Proceed with SQL LRS** - it's the only evaluated option that meets our operational and technical requirements.

## Engineering Guidelines Impact

This RFC establishes the following engineering standards:

### LRS Selection Standard
- **Use SQL LRS** for all new learning analytics implementations
- **Container-first deployment** using provided configurations
- **PostgreSQL backend** for consistency with existing data infrastructure

### Implementation Guidelines
- Follow SQL LRS container deployment patterns for consistency
- Use standardized xAPI statement structures
- Integrate with existing PostgreSQL-based BI tools and dashboards
- Implement standard health checks and monitoring

### Team Adoption
- Teams building learning analytics features must use SQL LRS
- Share xAPI statement patterns and integration code across teams

**Implementation Next Steps:**
1. ✅ SQL LRS technical validation completed
2. Create organizational xAPI statement standards documentation
3. Build PostgreSQL integration patterns for BI tools
4. Create operational runbooks and monitoring guidelines
5. Plan migration strategy for existing systems
