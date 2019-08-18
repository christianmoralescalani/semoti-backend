FROM node:10
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./build/src .

ENV PORT 3000
ENV FRONT_IP localhost:4200
ENV URI_MONGO mongodb://mongo/proyecto
ENV URI_NEO4J bolt://neo4j
ENV NEO4J_USER neo4j
ENV NEO4J_PASSWORD mora
ENV SECRET_JWT sistemadeestructuracionsemantica

CMD ["npm","start"]