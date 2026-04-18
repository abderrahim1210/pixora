document.querySelectorAll(".likeButton").forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();

        let photoId = this.dataset.photoId;
        this.classList.toggle('active');

        fetch("add_like.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "photo_id=" + photoId
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('likes_count-'+ photoId).textContent = data.totalLikes;
                } else {
                    alert(data.message);
                }
            })
            .catch(err =>
                console.log(err));
    })
});