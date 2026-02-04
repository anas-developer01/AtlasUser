import { ImageBaseUrl, SupportBaseUrl } from "../constant/Common";

export const chat = (token) => {  
    const result = fetch(SupportBaseUrl + 'getMessages?receiver_id=1', {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
    return result;
};  

export const send_message = (token,data) => {  
    const result = fetch(SupportBaseUrl + 'sendMessage', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
    return result;
  };
  
  export const getChat = (token) => {  
    const result = fetch(ImageBaseUrl + '/api/v1/getChats', {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
    return result;
  };

  export const getChatByID = (token,member_id,ticket_id) => {  
    const result = fetch(ImageBaseUrl + `/api/v1/getChatsByID?member_id=${member_id}&ticket_id=${ticket_id}`, {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
    return result;
  };
  
  export const sendMessageByID = (token,data) => {  
    const result = fetch(ImageBaseUrl + '/api/v1/addChat', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        return error;
      });
    return result;
  };
