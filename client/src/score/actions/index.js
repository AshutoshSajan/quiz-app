export default function handleDeleteScore(url, token) {
  return dispatch => {
    fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch({
            type: 'UPDATE_USER',
            payload: data
          });
          console.log(data, 'deleted score sucessfull...');
        } else if (!data.success) {
          dispatch({
            type: 'ERROR',
            payload: data.message
          });
          console.log(data, 'deleted score failed...');
        }
      })
      .catch(err => {
        console.log(err, 'delete score catch error...');
      });
  }
}