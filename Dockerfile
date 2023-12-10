# Step 1: Base Image
FROM node:20

# Step 2: Set Working Directory
WORKDIR /app

# Step 3: Copy Package Files
COPY package.json ./
COPY pnpm-lock.yaml ./

# Step 4: Install Dependencies
RUN npm install -g pnpm && pnpm install

# Step 5: Copy Source Code
COPY . .

# Step 6: Build Application
RUN pnpm build

#TODO: Change this step to modify .env based on preferences
COPY .env.example .env

# Step 7: Start Command
CMD ["pnpm", "start"]