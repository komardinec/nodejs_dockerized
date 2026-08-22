# Build container with dependencies
FROM node:26-alpine as build

WORKDIR /api_app

COPY package*.json ./
RUN npm ci

COPY . .

# Production image build
FROM node:26-alpine as prod

RUN addgroup -g 1001 -S nodejs && \
    adduser -S njsuser -u 1001

WORKDIR /api_app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=build /api_app/main.js ./

RUN chown -R njsuser:nodejs /api_app
USER njsuser

EXPOSE 8080

CMD ["npm", "start"]

