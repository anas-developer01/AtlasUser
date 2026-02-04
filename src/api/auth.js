import { BaseUrl } from "../constant/Common";

export const signIn = (data) => {  
    const result = fetch(BaseUrl + 'login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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

export const signUp = (data) => {  
    const result = fetch(BaseUrl + 'register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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

export const verify = (data) => {  
    const result = fetch(BaseUrl + 'verify-otp', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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

export const reset_password = (data) => {  
  const result = fetch(BaseUrl + 'reset-password', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
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

export const forgot = (data) => {  
  const result = fetch(BaseUrl + 'forgot-password?email='+data?.email, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
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

export const profile = (token) => {  
  const result = fetch(BaseUrl + 'getProfile', {
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

export const update_profile = (token,data) => {  
  const result = fetch(BaseUrl + 'update-profile', {
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

export const change_password = (token,data) => {  
  const result = fetch(BaseUrl + 'change-password', {
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

export const delete_account = (token,data) => {  
  const result = fetch(BaseUrl + 'deleteAccount', {
      method: 'POST',
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
