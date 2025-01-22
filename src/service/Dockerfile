#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
#USER app
WORKDIR /app
RUN apt-get update && apt-get install -y curl jq 
EXPOSE 80
EXPOSE 443
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
ARG FEEDURL
ARG PAT
WORKDIR /src
RUN dotnet nuget add source $FEEDURL --name grctechllc --username any --password $PAT --valid-authentication-types basic --store-password-in-clear-text
COPY ["Invoicing.Service/Invoicing.Service.csproj", "Invoicing.Service/"]
COPY ["Invoicing.Data/Invoicing.Data.csproj", "Invoicing.Data/"]
COPY ["Invoicing.Messaging/Invoicing.Messaging.csproj", "Invoicing.Messaging/"]
RUN dotnet restore "./Invoicing.Service/Invoicing.Service.csproj"
COPY . .
WORKDIR "/src/Invoicing.Service"
RUN dotnet run -- codegen write
RUN dotnet build "./Invoicing.Service.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Invoicing.Service.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
RUN ls
RUN echo "** Listing files after COPY operation **"
RUN ls -l /app
ENTRYPOINT ["dotnet", "Invoicing.Service.dll"]