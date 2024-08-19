export const sections = [
  { id: "introduction", Heading: "Introduction" },
  { id: "getstarted", Heading: "Get Started" },
  { id: "endpoints", Heading: "Endpoints" },
  { id: "integration", Heading: "Integration" },
  { id: "responses", Heading: "Responses" },
  { id: "error", Heading: "Error Handling" },
]

export const countryDatasetsv1 = {
  "countries-average-male-height": {
    description: "Provides a dataset on the average height of males across countries (in centimetres)."
  },
  "calling-code-flag": {
    description: "Provides a dataset of countries calling code, country name, country code and county flag."
  },
  "countries-capital": {
    description: "Provides the capital cities of countries."
  },
  "countries-code": {
    description: "Provides a dataset on the calling codes of countries."
  },
  "countries-coastline": {
    description: "Provides a dataset on the length of countries coastline if it has one (in Kilometres)."
  },
  "countries-continent": {
    description: "Provides a dataset of countries and their respective continents."
  },
  "countries-domain-tld": {
    description: "Provides a dataset of countries and their respective top level domain."
  },
  "countries-elevation": {
    description: "Provides a dataset of countries and their average elevation above sea level (in metres)."
  },
  "countries-emergency-codes": {
    description: " Provides a dataset of countries and their emergency calling codes."
  },
  "countries-geo-coordinates": {
    description: "Provides a dataset of countries and their geographical coordinates."
  },
  "countries-government-type": {
    description: "Provides a dataset of countries and the form of government practiced."
  },
  "countries-independence-date": {
    description: "Provides a dataset of countries and the year they gained independence."
  },
  "countries-landlocked": {
    description: "Provides a dataset of countries and whether they are landlocked."
  },
  "countries-life-expectancy": {
    description: "Provides a dataset of countries and the average life expectancy."
  },
  "countries-major-cities": {
    description: "Provides a dataset of countries and their major cities."
  },
  "countries-name": {
    description: "Provides a dataset of country names."
  },
  "countries-national-dish": {
    description: "Provides a dataset of countries and their national dishes."
  },
  "countries-population-density": {
    description: "Provides a dataset of countries and their population density (per sq km)."
  },
  "countries-states": {
    description: "Provides a list of countries and their states."
  },
  "countries-surface-area": {
    description: "Provides a dataset of countries and their area (in square kilometres)."
  },
  "countries-yearly-average-temperature": {
    description: "Provides a dataset of countries and their yearly average temperatures (in celsius)."
  },
  "countries": {
    description: "Provides country names and their codes."
  },
  "country-flag-currency": {
    description: "Provides country flags, names, codes, and currency details."
  },
  "country-flag": {
    description: "Provides country flags and codes."
  },
  "country-with-flag": {
    description: "Provides a dataset of country names with their flags."
  },
  "nigeria-states-lga": {
    description: "Provides a dataset on states in Nigeria and their local governments."
  },
  "nigerian-states": {
    description: "Provides a dataset on states in Nigeria."
  },
  "west-africa-countries": {
    description: "Provides a dataset on countries in West Africa, including flags, codes, and means of identification."
  }
};

export const countryDatasetsv2 = {
  "africa-countries-id": {
    description: "Provides a dataset on African countries, including flags, country codes, and means of identification."
  },
  "africa-countries": {
    description: "Provides general data about African countries."
  },
  "allcountries": {
    description: "Provides general data about all countries."
  },
  "nigerian-plate-numbers": {
    description: "Provides a dataset on three letter codes on vehicle plate number and their local government in Nigeria."
  }
};

export const steps = [
  {
    title: "Create an Account",
    description: "Sign up on our platform to create an account."
  },
  {
    title: "Copy your Username",
    description: "After creating an account, copy your username from the dashboard. This username will be used to authenticate your requests."
  },
  {
    title: "Generate an API Key",
    description: "After creating an account, generate your key from the dashboard. This key will be used to authenticate your requests."
  },
  {
    title: "Select Mode",
    description: "Choose between Test or Live mode. If you select Live mode, add the website URL to allow access."
  },
  {
    title: "Make API Requests",
    description: "Use your API key and your Username to make authenticated requests to the API endpoints."
  }
];

export const responseData = {
  "africa-countries-id": {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1f3-1f1ec.svg",
    country: "Nigeria",
    code: "ng",
    meansOfIdentications: ["National Identity Number"]
  },
  "africa-countries": {
    warning: "data is quite much, check it out on your end"
  },
  "allcountries": {
    warning: "data is quite much, check it out on your end"
  },
  "calling-code-flag": {
    name: "Afghanistan",
    callingCode: "+93",
    code: "AF",
    flag: "https://raw.githubusercontent.com/AbdulQuayyum/countries-flag/3fa8683a7546ce658863f556dcc8c32633fc5c1b/af.svg"
  },
  "countries-average-male-height": {
    country: "Afghanistan",
    height: 168
  },
  "countries-capital": {
    country: "Afghanistan",
    city: "Kabul"
  },
  "countries-code": {
    country: "Afghanistan",
    calling_code: 93
  },
  "countries-continent": {
    country: "Afghanistan",
    continent: "Asia"
  },
  "countries-domain-tld": {
    country: "Andorra",
    tld: ".ad"
  },
  "countries-elevation": {
    country: "Angola",
    elevation: 1112
  },
  "countries-emergency-codes": {
    Country: {
      Name: "Nigeria",
      ISOCode: "NG",
      ISONumeric: "566"
    },
    Ambulance: {
      All: ["112"]
    },
    Fire: {
      All: ["112"]
    },
    Police: { All: [112] },
    Dispatch: { All: [null] },
    Member_112: false,
    LocalOnly: false,
    Notes: null
  },
  "countries-geo-coordinates": {
    country: "American Samoa",
    north: -11.0497,
    south: -14.3825,
    west: -171.092,
    east: -169.416
  },
  "countries-government-type": {
    country: "Belgium",
    government: "Federation Constitutional Monarchy"
  },
  "countries-independence-date": {
    country: "Bahamas",
    independence: 1973
  },
  "countries-landlocked": {
    country: "Andorra",
    landlocked: true
  },
  "countries-life-expectancy": {
    country: "Argentina",
    expectancy: 75.1
  },
  "countries-major-cities": {
    country: "Azerbaijan",
    cities: [
      "Baku",
      "Nakhchivan",
      "Quba",
      "Qusar",
      "Sulutapa",
      "Sumqayit",
      "Xirdalan",
      "Zurges"
    ]
  },
  "countries-name": {
    country: "Afghanistan"
  },
  "countries-national-dish": {
    country: "Antigua and Barbuda",
    dish: "Pepperpot, Fungee"
  },
  "countries-population-density": {
    country: "Antarctica",
    density: 0.0035
  },
  "countries-states": {
    code2: "AF",
    code3: "AFG",
    name: "Afghanistan",
    capital: "Kabul",
    region: "Asia",
    subregion: "Southern Asia",
    states: [
      {
        code: "BDS",
        name: "Badakhshān",
        subdivision: null
      }
    ]
  },
  "countries-surface-area": {
    country: "Armenia",
    area: 29800.0
  },
  "countries-yearly-average-temperature": {
    country: "Angola",
    temperature: 21.77
  },
  "countries": {
    name: "Afghanistan",
    code: "AF"
  },
  "country-flag-currency": {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1e8.svg",
    country: "SHP - Ascension Island",
    code: "ac",
    currencies: {
      GBP: {
        name: "Pound sterling",
        symbol: "£"
      },
      SHP: {
        name: "Saint Helena pound",
        symbol: "£"
      }
    }
  },
  "country-flag": {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1e8.svg",
    country: "Ascension Island",
    code: "ac"
  },
  "country-with-flag": {
    country: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1e8.svg Ascension Island",
    code: "ac"
  },
  "nigeria-states-lga": {
    Abia: ["Aba North", "Aba South", "Arochukwu"]
  },
  "nigerian-plate-numbers": {
    "Federal-Capital-Territory-Abuja": [
      {
        Abbreviation: "ABJ",
        LGA: "Abaji Area Council"
      }
    ]
  },
  "nigerian-states": {
    state: "Abia",
    slogan: "GOD'S OWN STATE"
  },
  "west-africa-countries": {
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e7-1f1ef.svg",
    country: "Benin",
    code: "bj",
    meansOfIdentications: [
      "Passport",
      "Carte Nationale d'identité (National Identity Card)",
      "Driving licence",
      "Residence permit"
    ]
  }
};

export const integrationExamplesData = {
  javascript: `
      const axios = require('axios');
  
      const fetchData = async (username, apiKey, type) => {
        try {
          const response = await axios.post(\`https://soft-countries-api.onrender.com/v1/Service/GetService/\${type}\`, {}, {
            headers: {
              'Username': username,
              'ApiKey': apiKey,
              'Content-Type': 'application/json'
            }
          });
  
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching data:', error.response ? error.response.data : error.message);
        }
      };
  
      // Example usage
      fetchData('your-username', 'your-api-key', 'africa-countries');
    `,
  python: `
      import requests
  
      def fetch_data(username, api_key, data_type):
          url = f'https://soft-countries-api.onrender.com/v1/Service/GetService/{data_type}'
          headers = {
              'Username': username,
              'ApiKey': api_key,
              'Content-Type': 'application/json'
          }
  
          response = requests.post(url, headers=headers)
  
          if response.status_code == 200:
              print(response.json())
          else:
              print(f'Error fetching data: {response.status_code}', response.json())
  
      # Example usage
      fetch_data('your-username', 'your-api-key', 'africa-countries')
    `,
  php: `
      <?php
  
      function fetchData($username, $apiKey, $type) {
          $url = "https://soft-countries-api.onrender.com/v1/Service/GetService/$type";
          $headers = [
              "Username: $username",
              "ApiKey: $apiKey",
              "Content-Type: application/json"
          ];
  
          $options = [
              "http" => [
                  "header" => implode("\\r\\n", $headers),
                  "method" => "POST"
              ]
          ];
  
          $context = stream_context_create($options);
          $response = file_get_contents($url, false, $context);
  
          if ($response === FALSE) {
              die('Error fetching data');
          }
  
          echo $response;
      }
  
      // Example usage
      fetchData('your-username', 'your-api-key', 'africa-countries');
      ?>
    `,
  ruby: `
      require 'net/http'
      require 'uri'
      require 'json'
  
      def fetch_data(username, api_key, data_type)
        uri = URI.parse("https://soft-countries-api.onrender.com/v1/Service/GetService/#{data_type}")
        request = Net::HTTP::Post.new(uri)
        request["Username"] = username
        request["ApiKey"] = api_key
        request["Content-Type"] = "application/json"
  
        req_options = {
          use_ssl: uri.scheme == "https",
        }
  
        response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
          http.request(request)
        end
  
        if response.code.to_i == 200
          puts JSON.pretty_generate(JSON.parse(response.body))
        else
          puts "Error fetching data: #{response.code}", JSON.pretty_generate(JSON.parse(response.body))
        end
      end
  
      # Example usage
      fetch_data('your-username', 'your-api-key', 'africa-countries')
    `,
  java: `
      import java.io.IOException;
      import java.io.OutputStream;
      import java.net.HttpURLConnection;
      import java.net.URL;
  
      public class FetchData {
          public static void fetchData(String username, String apiKey, String type) throws IOException {
              URL url = new URL("https://soft-countries-api.onrender.com/v1/Service/GetService/" + type);
              HttpURLConnection connection = (HttpURLConnection) url.openConnection();
              connection.setRequestMethod("POST");
              connection.setRequestProperty("Username", username);
              connection.setRequestProperty("ApiKey", apiKey);
              connection.setRequestProperty("Content-Type", "application/json");
              connection.setDoOutput(true);
  
              int responseCode = connection.getResponseCode();
              if (responseCode == HttpURLConnection.HTTP_OK) {
                  String response = new String(connection.getInputStream().readAllBytes());
                  System.out.println(response);
              } else {
                  String error = new String(connection.getErrorStream().readAllBytes());
                  System.out.println("Error fetching data: " + responseCode + " " + error);
              }
          }
  
          public static void main(String[] args) throws IOException {
              fetchData("your-username", "your-api-key", "africa-countries");
          }
      }
    `,
  javascriptNode: `
      const axios = require('axios');
  
      const fetchData = async (username, apiKey, type) => {
        try {
          const response = await axios.post(\`https://soft-countries-api.onrender.com/v1/Service/GetService/\${type}\`, {}, {
            headers: {
              'Username': username,
              'ApiKey': apiKey,
              'Content-Type': 'application/json'
            }
          });
  
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching data:', error.response ? error.response.data : error.message);
        }
      };
  
      // Example usage
      fetchData('your-username', 'your-api-key', 'africa-countries');
    `,
  javascriptBrowser: `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Fetch Data</title>
        <script>
          async function fetchData() {
            const username = 'your-username';
            const apiKey = 'your-api-key';
            const type = 'africa-countries';
  
            try {
              const response = await fetch(\`https://soft-countries-api.onrender.com/v1/Service/GetService/\${type}\`, {
                method: 'POST',
                headers: {
                  'Username': username,
                  'ApiKey': apiKey,
                  'Content-Type': 'application/json'
                }
              });
  
              const data = await response.json();
              console.log(data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
  
          window.onload = fetchData;
        </script>
      </head>
      <body>
        <h1>Fetch Data</h1>
      </body>
      </html>
    `,
  go: `
      package main
  
      import (
          "bytes"
          "fmt"
          "io/ioutil"
          "net/http"
      )
  
      func fetchData(username, apiKey, dataType string) {
          url := fmt.Sprintf("https://soft-countries-api.onrender.com/v1/Service/GetService/%s", dataType)
  
          client := &http.Client{}
          req, err := http.NewRequest("POST", url, bytes.NewBuffer(nil))
          if err != nil {
              fmt.Println("Error creating request:", err)
              return
          }
  
          req.Header.Set("Username", username)
          req.Header.Set("ApiKey", apiKey)
          req.Header.Set("Content-Type", "application/json")
  
          resp, err := client.Do(req)
          if err != nil {
              fmt.Println("Error making request:", err)
              return
          }
          defer resp.Body.Close()
  
          if resp.StatusCode == http.StatusOK {
              body, _ := ioutil.ReadAll(resp.Body)
              fmt.Println(string(body))
          } else {
              body, _ := ioutil.ReadAll(resp.Body)
              fmt.Printf("Error fetching data: %d %s\n", resp.StatusCode, string(body))
          }
      }
  
      func main() {
          fetchData("your-username", "your-api-key", "africa-countries")
      }
    `,
  dart: `
      import 'package:http/http.dart' as http;
      import 'dart:convert';
  
      Future<void> fetchData() async {
        final username = 'your-username';
        final apiKey = 'your-api-key';
        final type = 'africa-countries';
  
        final url = Uri.parse('https://soft-countries-api.onrender.com/v1/Service/GetService/$type');
  
        final response = await http.post(
          url,
          headers: {
            'Username': username,
            'ApiKey': apiKey,
            'Content-Type': 'application/json',
          },
        );
  
        if (response.statusCode == 200) {
          final data = json.decode(response.body);
          print(data);
        } else {
          print('Error fetching data: \${response.statusCode} \${response.body}');
        }
      }
  
      void main() {
        fetchData();
      }
    `
};

export const integrationExamplesList = [
  { id: "javascript", Heading: "Javascript", language: "javascript" },
  { id: "python", Heading: "Python", language: "python" },
  { id: "php", Heading: "PHP", language: "php" },
  { id: "ruby", Heading: "Ruby", language: "ruby" },
  { id: "java", Heading: "Java", language: "java" },
  { id: "javascriptNode", Heading: "Javascript (Node Js)", language: "javascript" },
  { id: "javascriptBrowser", Heading: "javascript (Vanilla Js)", language: "javascript" },
  { id: "go", Heading: "Go", language: "go" },
  { id: "dart", Heading: "Dart (Flutter)", language: "dart" }
]