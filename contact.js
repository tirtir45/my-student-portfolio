document.addEventListener("DOMContentLoaded",()=>{
    const form = document.querySelector('#contact-form');
    
    form.addEventListener('submit', (e) => {

        const name=document.getElementById("name").value.trim();
        const email=document.getElementById("email").value.trim();
        const message=document.getElementById("message").value.trim();

    if(!name){
        alert("Please enter your full name (╥﹏╥)");
        e.preventDefault();
        return;
    }

    if(!email){
        alert("Please enter your email (╥﹏╥)");
        e.preventDefault();
        return;
    }

    if(!message){
        alert("Please enter your message (╥﹏╥)");
        e.preventDefault();
        return;
    }
    alert('Your message is sent◝(ᵔᗜᵔ)◜');
    });
});