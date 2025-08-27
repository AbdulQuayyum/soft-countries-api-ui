# Soft Countries API

Welcome to the Soft Countries API! This API Service provides various datasets related to countries, including flags, codes, capitals, continents, and more. The API is built using Express.js and serves JSON data dynamically based on the type specified by the user.

**Domain:** [Soft Countries API](https://soft-countries-api.onrender.com)

## Table of Contents

- [Soft Countries API](#soft-countries-api)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Data Types](#data-types)
- [Data Summary](#data-summary)
- [Example Data](#example-data)
- [Contribution](#contribution)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication:** Register and log in to access the API functionalities securely.
- **API Key Management:** Generate, fetch, delete, and manage API keys securely.
- **Data Retrieval:** Retrieve country-related datasets based on different types.
- **Call Counts:** Track and fetch call counts made by users to the API.
- **API Key Expiration:** Set expiration dates for API keys for added security.

## API Endpoints

- **POST /v1/Service/GetService/:type:** Retrieve country-related datasets based on the specified type.

  Replace `:type` with the specific type of data you want to fetch. For example, to get data for African countries, you would use `africa-countries`.

## Data Types

Here are the different types of data you can fetch using the API:

- `africa-countries-id`
- `africa-countries`
- `allcountries`
- `calling-code-flag`
- `cities`
- `countries-average-male-height`
- `countries-by-alphabet`
- `countries-capital`
- `countries-coastline`
- `countries-code`
- `countries-continent`
- `countries-domain-tld`
- `countries-elevation`
- `countries-emergency-codes`
- `countries-geo-coordinates`
- `countries-government-type`
- `countries-independence-date`
- `countries-landlocked`
- `countries-life-expectancy`
- `countries-major-cities`
- `countries-name`
- `countries-national-dish`
- `countries-population-density`
- `countries-states`
- `countries-surface-area`
- `countries-yearly-average-temperature`
- `countries`
- `country-flag-currency`
- `country-flag`
- `country-with-flag`
- `nigeria-states-lga`
- `nigeria-states-lgas-wards`
- `nigerian-plate-numbers`
- `nigerian-states`
- `west-africa-countries`

## Data Summary

- **africa-countries-id**: PProvides a dataset on African countries, including flags, country codes, and means of identification.
- **countries-average-male-height**: Provides a dataset on the average height of males across countries (in centimetres).
- **africa-countries**: Provides general data about African countries.
- **allcountries**: Provides general data about all countries.
- **calling-code-flag**: Provides a dataset of countries calling code, country name, country code and county flag.
- **cities**: Provides a dataset of all cities name, cities code, country name, country code.
- **countries-capital**: Provides the capital cities of countries.
- **countries-code**: Provides a dataset on the calling codes of countries.
- **countries-coastline**: Provides a dataset on the length of countries coastline if it has one(in Kilometres).
- **countries-continent**: Provides a dataset of countries and their respective continents.
- **countries-domain-tld**: Provides a dataset of countries and their respective top level domain.
- **countries-elevation**: Provides a dataset of countries and their average elevation above sea level(in metres).
- **countries-emergency-codes**: Provides a dataset of countries and their emergency calling codes.
- **countries-geo-coordinates**:Provides a dataset of countries and their geo cordinates .
- **countries-government-type**: Provides of countries and the form og government practiced.
- **countries-independence-date**:Provides a dataset of countries and the year they gained independece .
- **countries-landlocked**: Provides a dataset of countries and whether they are landlocked.
- **countries-life-expectancy**: Provides a dataset of countries and the average life expentancy.
- **countries-major-cities**: Provides a dataset of countries and their major cities.
- **countries-name**: Provides a dataset of country names.
- **countries-national-dish**: Provides a dataset of countries and their national dishes.
- **countries-population-density**: Provides a dataset of countries and their population density(per sq km).
- **countries-states**: Provides a list of countries and their states.
- **countries-surface-area**: Provides a dataset of countries and their area(in square kilometres).
- **countries-yearly-average-temperature**: Provides a dataset of countries and their yearly average temperatures(in celsius).
- **countries**: Provides country names and their codes.
- **country-flag-currency**: Provides country flags, names, codes, and currency details.
- **country-flag**: Provides country flags and codes.
- **country-with-flag**:Provides a dataset of country names with their flags.
- **nigeria-states-lga**: Provides a dataset on states in Nigeria and their local governments.
- **nigeria-states-lgas-wards**: Provides a dataset on states in Nigeria and their local governments, wards and their longitude and latitude.
- **nigerian-plate-numbers**: Provides a dataset on three letter codes on vehicle plate number and their local government in Nigeria.
- **nigerian-states**: Provides a dataset on states in Nigeria.
- **west-africa-countries**: Provides a dataset on countries in West Africa, including flags, codes, and means of identification.

## Example Data

#### `africa-countries-id`

```json
{
  "flag": "https://twemoji.maxcdn.com/2/svg/1f1f3-1f1ec.svg",
  "country": "Nigeria",
  "code": "ng",
  "meansOfIdentications": ["National Identity Number"]
}
```

#### `africa-countries`

###### data is quite much, check it out on your end

#### `allcountries`

###### data is quite much, check it out on your end

#### `calling-code-flag`

```json
{
  "name": "Afghanistan",
  "callingCode": "+93",
  "code": "AF",
  "flag": "https://raw.githubusercontent.com/AbdulQuayyum/countries-flag/3fa8683a7546ce658863f556dcc8c32633fc5c1b/af.svg"
}
```
#### `cities`

```json
 {
    "id": 52,
    "name": "Ashkāsham",
    "country_id": 1,
    "country_code": "AF",
    "country_name": "Afghanistan",
    "state_id": 3901,
    "state_code": "BDS",
    "state_name": "Badakhshan",
    "latitude": "36.68333000",
    "longitude": "71.53333000",
    "wikiDataId": "Q4805192"
  }
```

#### `countries-average-male-height`

```json
    {
        "country": "Afghanistan",
        "height": 168
    },
```

#### `countries-by-alphabet`

```json
    "Z": {
      "countries": [
        {
          "country": "Zambia"
        },
        {
          "country": "Zimbabwe"
        }
      ]
    }
```

#### `countries-capital`

```json
{
  "country": "Afghanistan",
  "city": "Kabul"
}
```

#### `countries-coastline`

```json
{
  "country": "Argentina",
  "coastline": 4.989
}
```

#### `countries-code`

```json
{
  "country": "Afghanistan",
  "calling_code": 93
}
```

#### `countries-continent`

```json
{
  "country": "Afghanistan",
  "continent": "Asia"
}
```

#### `countries-domain-tld`

```json
{
  "country": "Andorra",
  "tld": ".ad"
}
```

#### `countries-elevation`

```json
{
  "country": "Angola",
  "elevation": 1112
}
```

#### `countries-emergency-codes`

```json
{
  "Country": {
    "Name": "Nigeria",
    "ISOCode": "NG",
    "ISONumeric": "566"
  },
  "Ambulance": {
    "All": ["112"]
  },
  "Fire": {
    "All": ["112"]
  },
  "Police": {
    "All": ["112"]
  },
  "Dispatch": {
    "All": [null]
  },
  "Member_112": false,
  "LocalOnly": false,
  "Notes": null
}
```

#### `countries-geo-coordinates`

```json
{
  "country": "American Samoa",
  "north": -11.0497,
  "south": -14.3825,
  "west": -171.092,
  "east": -169.416
}
```

#### `countries-government-type`

```json
{
  "country": "Belgium",
  "government": "Federation Constitutional Monarchy"
}
```

#### `countries-independence-date`

```json
{
  "country": "Bahamas",
  "independence": 1973
}
```

#### `countries-landlocked`

```json
{
  "country": "Andorra",
  "landlocked": true
}
```

#### `countries-life-expectancy`

```json
{
  "country": "Argentina",
  "expectancy": 75.1
}
```

#### `countries-major-cities`

```json
{
  "country": "Azerbaijan",
  "cities": [
    "Baku",
    "Nakhchivan",
    "Quba",
    "Qusar",
    "Sulutapa",
    "Sumqayit",
    "Xirdalan",
    "Zurges"
  ]
}
```

#### `countries-name`

```json
{
  "country": "Afghanistan"
}
```

#### `countries-national-dish`

```json
{
  "country": "Antigua and Barbuda",
  "dish": "Pepperpot, Fungee"
}
```

#### `countries-population-density`

```json
{
  "country": "Antarctica",
  "density": 0.0035
}
```

#### `countries-states`

```json
{
  "code2": "AF",
  "code3": "AFG",
  "name": "Afghanistan",
  "capital": "Kabul",
  "region": "Asia",
  "subregion": "Southern Asia",
  "states": [
    {
      "code": "BDS",
      "name": "Badakhshān",
      "subdivision": null
    }
  ]
}
```

#### `countries-surface-area`

```json
{
  "country": "Armenia",
  "area": 29800.0
}
```

#### `countries-yearly-average-temperature`

```json
{
  "country": "Angola",
  "temperature": 21.77
}
```

#### `countries`

```json
{
  "name": "Afghanistan",
  "code": "AF"
}
```

#### `country-flag-currency`

```json
{
  "flag": "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1e8.svg",
  "country": "SHP - Ascension Island",
  "code": "ac",
  "currencies": {
    "GBP": {
      "name": "Pound sterling",
      "symbol": "£"
    },
    "SHP": {
      "name": "Saint Helena pound",
      "symbol": "£"
    }
  }
}
```

#### `country-flag`

```json
{
  "flag": "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1e8.svg",
  "country": "Ascension Island",
  "code": "ac"
}
```

#### `country-with-flag`

```json
{
  "country": "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1e8.svg Ascension Island",
  "code": "ac"
}
```

#### `nigeria-states-lga`

```json
{
  "Abia": ["Aba North", "Aba South", "Arochukwu"]
}
```

#### `nigeria-states-lgas-wards`

```json
{
  "state": "Abia",
  "lgas": [
    {
      "name": "Aba North",
      "wards": [
        {
          "name": "Ariaria Market",
          "latitude": 5.114318609,
          "longitude": 7.343425561
        }
      ]
    }
  ]
}
```

#### `nigerian-plate-numbers`

```json
{
  "Federal-Capital-Territory-Abuja": [
    {
      "Abbreviation": "ABJ",
      "LGA": "Abaji Area Council"
    }
  ]
}
```

#### `nigerian-states`

```json
{
  "state": "Abia",
  "slogan": "GOD'S OWN STATE"
}
```

#### `west-africa-countries`

```json
{
  "flag": "https://twemoji.maxcdn.com/2/svg/1f1e7-1f1ef.svg",
  "country": "Benin",
  "code": "bj",
  "meansOfIdentications": [
    "Passport",
    "Carte Nationale d'identité (National Identity Card)",
    "Driving licence",
    "Residence permit"
  ]
}
```

### Contribution

Feel free to contribute to the project by opening issues or submitting pull requests on [GitHub](https://github.com/AbdulQuayyum/soft-countries-api-ui.git).

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Contact

For any inquiries, please contact me at alaoabdulquayyumm@gmail.com
