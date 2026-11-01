# ArtApp

# ABOUT
ArtApp is a web application for managing artist merchandise, tracking sales and inventory, and calculating revenue sharing and shared expenses. It helps improve accuracy, transparency, and efficiency in booth management.

Main objectives:
- Track sales and update inventory in real time.
- Calculate each artist's earnings accurately.
- Allocate shared expenses, such as booth rental and transportation costs.
- Generate transparent sales and financial summaries.
- Reduce manual errors and financial disputes.

2. Target Users

## Booth Administrator / Host

The Booth Administrator manages the overall sales operations and configuration of the system.

Responsibilities include:
- Creating and managing Sales Runs.
- Managing suppliers, products, and inventory.
- Inviting members and managing access permissions.
- Monitoring sales transactions and expenses.
- Reviewing sales summaries and exporting reports.

## Collaborator / Artist / Supplier

Collaborators are artists or product owners who consign their merchandise to the shared booth.

Responsibilities include:
- Monitoring product inventory and sales performance.
- Viewing individual sales records and earnings.
- Reviewing financial summaries and allocated expenses.
- Tracking sales progress during an active Sales Run.

# feature

- Sales Run Management: Create and manage sales runs, products, and suppliers.
- Inventory Tracking: Monitor stock levels and update product quantities.
- Sales and Expense Tracking: Record sales and shared expenses.
- Revenue Sharing: Calculate each artist’s earnings and allocate shared expenses.
- Sales Summary and Statistics: View sales performance and generate reports.

# System Architecture

## 1. Frontend Layer
- Built with Next.js and React
- Provides the user interface for booth administrators, artists, and suppliers
- Handles sales pages, dashboard views, authentication, and reporting pages

## 2. Backend Layer
- Built with Java and Spring Boot
- Provides REST API endpoints for managing users, sales runs, inventory, expenses, and financial summaries
- Implements business logic for revenue sharing and transaction processing

## 3. Data Layer
- Uses MySQL as the main relational database
- Stores users, products, sales, inventory, expenses, and earnings records
- Supports data persistence and reporting for booth operations

## 4. Deployment / Runtime
- The project is containerized with Docker Compose
- The system runs as separate services:
  - Frontend service
  - Backend service
  - MySQL database service

## 5. System Flow
Browser -> Next.js Frontend -> Spring Boot API -> MySQL Database

# project stucture

backend/
    ├── src/
    │   ├── main/
            ├── controller/
            ├── entity/
            ├── java/
            └── resources/
    └── test/

frontend
├── app/                    
     ├── auth/              
     ├── components/         
     ├── dashboard/          
     ├── features/           
     ├── profile/            
     ├── SaleRun/            
     ├── sales/             
     ├── tests/   
     └── ViewUser/              
├── lib/            
└── public/                 


# Member of The Group
6831503043 Natdaporn Thao-on
6831503059 Piyapat Koedsuk
6831503074 Sirinan Mahapibule 
6831503033 Kanyaphorn Saengwong
6831503077 Sutheemon Kawee