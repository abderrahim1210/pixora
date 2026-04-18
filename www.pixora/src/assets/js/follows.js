document.querySelectorAll('.followButton').forEach(btn => {
    btn.addEventListener('click', function () {
        const user_id = this.dataset.user_id;
        const currentBtn = this;
        fetch('add_follow.php?id=' + user_id)
            .then(res => res.json())
            .then(data => {
                if (data.status === "followed") {
                    currentBtn.textContent = "Followed";
                    currentBtn.classList.add('active');
                } else if (data.status === "unfollowed") {
                    currentBtn.textContent = "Follow";
                    currentBtn.classList.remove('active');
                }
            })
            .catch(console.error);
    })
})