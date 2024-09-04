GraphQL Practice with Countries Dataset
=======================================

Introduction
------------

In this document, you will work with the https://countries.trevorblades.com GraphQL API to practice your GraphQL skills. This API provides data about countries, including details such as continents, languages, and more. You'll explore this API by writing queries to retrieve and manipulate data creatively.

### Before You Begin: Exploring the Website

1.  Visit the Website: Go to https://countries.trevorblades.com.

2.  Explore the GraphQL Editor: Familiarize yourself with the interface:

-   Top-Left Button: Click the button in the top-left corner to explore the documentation. This provides details about available queries, types, and how to structure your requests.

-   Query Editor: Practice writing queries in the editor and click the "Play" button to see the results.

-   Docs Section: The docs section is your best friend! Use it to explore the available fields, types, and operations.

Take some minutes to freely explore the API, try out different queries, and get comfortable with the GraphQL syntax.

* * * * *

Exercises: Working with the Countries Dataset
---------------------------------------------

Now that you've explored the interface and the documentation, it's time to dive into some practical exercises. 

### Exercise 1: Find Countries with Specific Conditions

Write a query to find all countries that:

-   Have the letter "a" in their name.

-   Are located in the continent of Europe.

Hint: Use filtering and field selection creatively.

~### Exercise 2: Languages with Specific Characteristics~ - NOT WORKING WITH THIS SCHEMA

Create a query that fetches all languages that:

-   Are written right-to-left (rtl).

-   Also fetch the countries that use these languages.

Hint: You can find a rtl (right-to-left) field under the Language type.

### Exercise 3: Detailed Continent Report

Generate a detailed report for each continent that includes:

-   The name of the continent.

-   ~The number of countries in each continent~

-   The names of all countries within each continent.

Hint: You'll need to combine field selection with nested queries.

### Exercise 4: Display State Details for Specific Countries

Write a query that fetches:

-   The name of each state within the United States (code: "US") and India (code: "IN").

-   The corresponding country name for each state.

Hint: Explore the State type in the documentation to see what's available.

### Exercise 5: Group Countries by Currency

Create a query that groups countries by their currency. For each unique currency, display:

-   The currency code.

-   The names of all countries that use that currency.

Hint: This will involve nested queries and some creative structuring.

~### Exercise 6: Multi-Level Data Query~ - NOT WORKING WITH THIS SCHEMA

Write a query that retrieves:

-   The names of all countries that use French (code: "fr") as a language.

-   The continent these countries belong to.

-   The emoji flag of each country.

Hint: Combine language filtering, continent data, and emoji fields.

* * * * *

## Exercises Added Later

### Exercise 7

Write a query that retrieves

- Countries whose name contains "i", but do not end with "land"

* * * * *

Solutions :
-----------

<details>
  <summary>
    Click to reveal solution
  </summary>

  ```typescript

  ```
</details>

### Exercise 1: Find Countries with Specific Conditions
<details>
  <summary>
    Click to reveal solution
  </summary>

  ```typescript
  {

  countries(filter: { continent: { eq: "EU" }, name: { regex: ".*a.*" } }) {

    name

    capital

    }
  
  }
  ```
</details>


### Exercise 2: Languages with Specific Characteristics
<details>
  <summary>
    Click to reveal solution
  </summary>

  ```typescript
  {
  
    languages(filter: { rtl: { eq: true } }) {
  
      name
  
      countries {
  
        name
  
      }
  
    }
  
  }
```
</details>

### Exercise 3: Detailed Continent Report
<details>
  <summary>
    Click to reveal solution
  </summary>

  ```typescript
  {
  
    continents {
  
      name
  
      countries {
  
        name
  
      }
  
    }
  
  }
```
</details>

### Exercise 4: Display State Details for Specific Countries
<details>
  <summary>
    Click to reveal solution
  </summary>

  ```typescript
  {
  
    US: country(code: "US") {
  
      name
  
      states {
  
        name
  
      }
  
    }
  
    IN: country(code: "IN") {
  
      name
  
      states {
  
        name
  
      }
  
    }
  
  }
```
</details>

### Exercise 5: Group Countries by Currency
<details>
  <summary>
    Click to reveal solution
  </summary>

  ```typescript
  {
  
    countries {
  
      currency
  
      name
  
    }
  
  }
```
</details>

### Exercise 6: Multi-Level Data Query
<details>
  <summary>
    Click to reveal solution
  </summary>

  ```typescript
  {
  
    languages(filter: { code: { eq: "fr" } }) {
  
      countries {
  
        name
  
        continent {
  
          name
  
        }
  
        emoji
  
      }
  
    }
  
  }
  ```
  </details>


### Exercise 7
<details>
  <summary>
    Click to reveal solution
  </summary>

  ```typescript
  {
    countries(filter: { 
      name: { regex: ".*i.*", ne: ".*land$" } 
    }) {
      name
    }
  }
  ```
<details></details>
