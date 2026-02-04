import { BaseUrl, ImageBaseUrl } from "../constant/Common";

export const dashboard = (token,status) => {  
  let url = BaseUrl + 'dashboard';
  const result = fetch(url, {
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

export const department = (token) => {  
  const result = fetch(BaseUrl + 'tickets/getDepartments', {
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

export const services = (token, id) => {
  const result = fetch(BaseUrl + 'tickets/getServicesByDepartment?department_id='+id, {
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

export const categories = (token, id) => {
  const result = fetch(BaseUrl + 'tickets/getCategoriesByService?service_id='+id, {
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

export const subcategories = (token,id) => {  
  const result = fetch(BaseUrl + 'tickets/getSubCategoriesByCategory?category_id='+id, {
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

export const childbysubcategories = (token,id) => {  
  const result = fetch(BaseUrl + 'tickets/getChildCategoriesBySubCategory?subcategory_id='+id, {
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

export const tickets = (token,status) => {  
    let url = BaseUrl + 'tickets/getTickets';
    if(status){
        url = BaseUrl + 'tickets/getTickets?status='+status
    }
    const result = fetch(url, {
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

export const addTicke = (token,data) => {  
    const result = fetch(BaseUrl + 'tickets/addTicket', {
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

export const ticketDetail = (token,id) => {  
    let url = BaseUrl + 'tickets/getTicketDetails?ticket_id='+id;
    const result = fetch(url, {
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

export const ticketByPost = (token,id) => {  
  let url = ImageBaseUrl + '/api/v1/employee/ticketsStausPost/getTicketsPostByTicketStatus?tickets_status_id='+id;
  const result = fetch(url, {
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

export const customerFeedback = (token,data) => {  
  let url = ImageBaseUrl + '/api/v1/employee/ticketsStausPost/ticketStatusPostFeedbackByCustomer';
  const result = fetch(url, {
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

export const ticketByPostID = (token,id) => {  
  let url = ImageBaseUrl + '/api/v1/employee/ticketsStausPost/getTicketPostDetails?tickets_status_post_id='+id;
  const result = fetch(url, {
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

export const defaultTicketByPostID = (token,id) => {  
  let url = ImageBaseUrl + '/api/v1/employee/ticketsStaus/getTicketStatusDetails?tickets_status_id='+id;
  const result = fetch(url, {
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

export const addFeedback = (token,data) => {  
  const result = fetch(BaseUrl + 'reviews/savedReview', {
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
