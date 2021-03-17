document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
      console.info('DOM loaded');
    }
  
    const changeDevourBtns = document.querySelectorAll('.change-devour');
  
    // Set up the event listener for the create button
    if (changeDevourBtns) {
      changeDevourBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
          // Grabs the id of the element that goes by the name, "id"
          const id = e.target.getAttribute('data-id');
          const newDevour = e.target.getAttribute('data-newdevour');
  
          const newDevourState = {
            devoured: newDevour,
          };
  
          fetch(`/api/burgers/${id}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
  
            body: JSON.stringify(newDevourState),
          }).then((response) => {
            // Check response
            // Reload page
            if (response.ok) {
              console.log(`changed devour to: ${newDevour}`);
              location.reload('/');
            } else {
              alert('something went wrong!');
            }
          });
        });
      });
    }
  
    const createBurgersBtn = document.getElementById('create-form');
  
    if (createBurgersBtn) {
      createBurgersBtn.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const newBurger = {
          name: document.getElementById('bun').value.trim(),
          devoured: document.getElementById('devoured').checked,
        };
  
        // Send POST request to create a new quote
        fetch('/api/burgers', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
  
          // make sure to serialize the JSON body
          body: JSON.stringify(newBurger),
        }).then(() => {
          // Empty the form
          document.getElementById('bun').value = '';
  
          // Reload the page so the user can see the new quote
          console.log('Created a new burger!');
          location.reload();
        });
      });
    }
  
    // DELETE
    const deleteBurgerBtns = document.querySelectorAll('.delete-burger');
  
    // Set up the event listeners for each delete button
    deleteBurgerBtns.forEach((button) => {
      button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
  
        // Send the delete request
        fetch(`/api/burgers/${id}`, {
          method: 'DELETE',
        }).then((res) => {
          console.log(res);
          console.log(`Deleted burger: ${id}`);
  
          // Reload the page
          location.reload();
        });
      });
    });
  });
  