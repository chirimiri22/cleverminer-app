# frontend/Dockerfile
FROM node:22

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* ./
RUN npm install

COPY . .

ARG REACT_APP_API_BASE_URL
RUN echo "REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}" > .env
RUN npm run build

# You can use serve for dev preview
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
