function delete_photo(photoId) {
    Swal.fire({
        title: "Are you sure for delete file ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(0, 120, 255)",
        cancelButtonColor: "#494949",
        confirmButtonText: "Yes, delete it",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted",
                text: "Your photo has been deleted",
                icon: "success"
            });
            document.getElementById("DelPhotoForm"+photoId).submit();
        }
    });
    return false;
}