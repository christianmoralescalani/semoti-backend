import { v1 as neo4j } from 'neo4j-driver';
import dotenv from 'dotenv';
import { Session, Driver, StatementResult } from 'neo4j-driver/types/v1';

//dotenv.config();


class Neo4jDB {
    URI: string = `${process.env.URI_NEO4J}`;
    USUARIO: string = `${process.env.NEO4J_USER}`;
    CONTRASENA: string = `${process.env.NEO4J_PASSWORD}`;
    SESSION: Session;
    DRIVER: Driver;
    AUTH: neo4j.AuthToken;
    constructor() {
        this.AUTH = neo4j.auth.basic(this.USUARIO, this.CONTRASENA);
        this.DRIVER = neo4j.driver(this.URI, this.AUTH);
        this.SESSION = this.DRIVER.session();
        if(this.SESSION){
            console.log("Neo4j is connect");
            
        }
        else{
            console.log("Error al conectar");
        }
        


    }

     async Run(consulta: string) {
        return  await this.SESSION.run(consulta);
    }
    async Close(){

        await this.SESSION.close(()=>{
            console.log("Session cerrada");
        });
    }
}


export default Neo4jDB;


