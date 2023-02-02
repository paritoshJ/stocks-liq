import axios, {create} from 'axios';
import {HTTP_METHODS, ERROR_MESG, ERROR_CODE} from './api_constants';
import {api_environments} from './api_environments';
/**
 * axios object
 */
const API = create({
  timeout: 60000,
});

// Add a request interceptor
API.interceptors.request.use(
  config => {
    // Do something before request is sent
    console.log('request config is : ');
    console.log(config);
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
API.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('response config is : ');
    console.log(response);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

/***
 * Get common request headers object
 */
const getReqHeaders = async () => {
  return {
    'X-ClientID': api_environments.API_DOMAIN,
    'X-DeviceID': 'Mobile',
    
    // isLocal: __DEV__,
  };
};
/**
 * To perform api from class where this function/method is imported,
 * and send back completion in resolve or reject based on api response.
 */
export const request = (
  url,
  httpMethod,
  params,
  header = {},
  isWithToken = false,
  token = '',
) =>
  new Promise(async (resolve, reject) => {
    //the token is a variable which holds the token
    try {
      // {Authorization: `Bearer + ${store.LoginReducer.bearerToken}}
      const tokenObj = isWithToken
        ? {
            Authorization: `Bearer ${token}}`,
          }
        : {};
      const configObj = {
        headers: {
          ...header,
          ...tokenObj,
        },
      };

      console.log('<><><><><> url <><><><><>', url);
      console.log('<><><><><> httpMethod <><><><><>', httpMethod);
      console.log('<><><><><> params <><><><><>', JSON.stringify(params));
      console.log(
        '<><><><><> headers <><><><><>',
        JSON.stringify(configObj.headers),
      );

      switch (httpMethod) {
        // GET
        case HTTP_METHODS.GET:
          doGet(url, resolve, reject, configObj);
          break;

        // POST
        case HTTP_METHODS.POST:
          doPost(url, params, resolve, reject, configObj);
          break;

        // PUT
        case HTTP_METHODS.PUT:
          doPut(url, params, resolve, reject, configObj);
          break;

        // DELETE
        case HTTP_METHODS.DELETE:
          doDelete(url, params, resolve, reject, configObj);
          break;
      }
    } catch (error) {
      console.log('<><><><><> error <><><><><>', error);
      reject(error);
    }
  });

/**
 *  This function is used to parse response and send completion to handle resolve and reject value for parent Promise.
 * We can consider it as a child promise
 * @param {*} response
 */
export const parseResponse = response =>
  new Promise(parsedResponse => {
    const isSuccess =
      response.status === 200 || response.status === 201 ? true : false;
    if (isSuccess) {
      parsedResponse({isSuccess: true, response: response});
    } else {
      let message = ERROR_MESG.SOMETHING_WENT_WRONG;
      if (response.data != null && response.data.message) {
        message = response.data.message;
      }
      parsedResponse({isSuccess: false, message: message});
    }
  });

/***
 * This function is used for service request with GET as request type
 * and send back completion in resolve or reject based on parent Promise.
 * @param {*} url
 * @param {*} resolve
 * @param {*} reject
 * @param {*} config
 */
const doGet = (url, resolve, reject, config = {}) => {
  API.get(url, config)
    .then(response => {
      parseResponse(response).then(parsedResponse => {
        if (parsedResponse.isSuccess) {
          resolve({response: parsedResponse.response});
        } else {
          reject(parsedResponse.message);
        }
      });
    })
    .catch(error => {
      console.log('<><><><><> error in Get <><><><><>', error, url);
      if (error && error.response) {
        reject(error);
      } else {
        const errorInfo = {
          msg: 'connect/re-connect VPN and then open the APP ',
          code: 467,
        };
        reject(error);
      }
    });
};

/***
 * This function is used for service request with POST as request type
 * and send back completion in resolve or reject based on parent Promise.
 * @param {*} url
 * @param {*} resolve
 * @param {*} reject
 * @param {*} config
 */
const doPost = (url, params, resolve, reject, config = {}) => {
  API.post(url, params, config)
    .then(response => {
      console.log('url:UD', url);
      console.log('response:UD', response);
      parseResponse(response).then(parsedResponse => {
        if (parsedResponse.isSuccess) {
          resolve({response: parsedResponse.response});
        } else {
          reject(parsedResponse.message);
        }
      });
    })
    .catch(error => {
      console.log('<><><><><> error in POST <><><><><>', error, url);

      // if (error && error.response) {
      //   reject(error)
      // } else {
      //   const errorInfo = {
      //     msg: 'connect/re-connect VPN and then open the APP ',
      //     code: 467,
      //   };
      //   DeviceEventEmitter.emit(ERROR_MESG.SOMETHING_WENT_WRONG, errorInfo);
      // }
      reject(error);
    });
};

/***
 * This function is used for service request with PUT as request type
 * and send back completion in resolve or reject based on parent Promise.
 * @param {*} url
 * @param {*} resolve
 * @param {*} reject
 * @param {*} config
 */
const doPut = (url, params, resolve, reject, config = {}) => {
  API.put(url, params, config)
    .then(response => {
      console.log('url:UD', url);
      console.log('response:UD', response);
      parseResponse(response).then(parsedResponse => {
        if (parsedResponse.isSuccess) {
          resolve({response: parsedResponse.response});
        } else {
          reject(parsedResponse.message);
        }
      });
    })
    .catch(error => {
      console.log('<><><><><> error in PUT <><><><><>', error, url);
      reject(error);
    });
};

/***
 * This function is used for service request with DELETE as request type
 * and send back completion in resolve or reject based on parent Promise.
 * @param {*} url
 * @param {*} resolve
 * @param {*} reject
 * @param {*} config
 */
const doDelete = (url, params, resolve, reject, config = {}) => {
  API.delete(url, config)
    .then(response => {
      parseResponse(response).then(parsedResponse => {
        console.log(`url ${url} response => ${JSON.stringify(response)}`);
        console.log(
          `url ${url} parsed response => ${JSON.stringify(parsedResponse)}`,
        );
        if (parsedResponse.isSuccess) {
          resolve({response: parsedResponse.response});
        } else {
          reject(parsedResponse);
        }
      });
    })
    .catch(error => {
      console.log('<><><><><> error in DELETE <><><><><>', error, url);
      reject(error.response);
    });
};
