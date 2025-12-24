<?php
include_once "convert_date.php";
?>
<ul class="comments-list mt-4">
    <?php foreach ($cs as &$c): ?>
        <li class="comment-item">
            <img src="<?= (!empty($c['photo_profile']) ? 'profile_pictures/' . $c['photo_profile'] : 'outils/pngs/useracc2.png') ?>" alt="user" class="comment-avatar">
            <div class="comment-body d-flex justify-content-between align-items-start">
                <div>
                    <h6 class="comment-author"><?= $c['username']; ?><small><?= $c['updated_at'] ? ' Edited' : '' ?></small></h6>
                    <div class="display-div">
                        <p class="comment-text"><?= htmlspecialchars($c['content'], ENT_QUOTES, 'UTF-8'); ?></p>
                    </div>
                    <div class="edit-div">
                        <form action="update_comment.php" class="upCommentForm" method="post">
                            <textarea name="comment_content" class="form-control mt-1" rows="1"><?= $c['content']; ?></textarea>
                            <input type="hidden" name="photo_id" value="<?= $c['photo_id']; ?>">
                            <input type="hidden" name="comment_id" value="<?= $c['id']; ?>">
                        </form>
                    </div>

                    <span class="comment-date"><?= timeAgo($c['created_at']); ?></span>
                </div>
                <div class="postition-relative">
                    <button class="saveChange btn p-1"><i class="fas fa-check"></i></button>
                    <button class="resetChange btn p-1 text-danger"><i class="fas fa-times"></i></button>
                    <a href="#" data-bs-toggle="dropdown" style="color: #222;" data-bs-target="#drp1" class="menuBtn"><i class="fas fa-ellipsis-v"></i></a>
                    <div class="dropdown" id="drp1">
                        <ul class="dropdown-menu">
                            <?php if ($userid == $c['user_id']): ?>
                                <li><a style="cursor: pointer;" class="editComment dropdown-item"><i class="fas fa-pencil"></i> Edit</a></li>
                                <li><a href="#" class="copyComment dropdown-item"><i class="fas fa-copy"></i> Copy</a></li>
                                <li>
                                    <form action="delete_comment.php" method="post" class="delCommentForm">
                                        <button type="button" class="deleteComment btn dropdown-item"><i class="fas fa-trash"></i> Delete</button>
                                        <input type="hidden" name="photo_id" value="<?= $c['photo_id']; ?>">
                                        <input type="hidden" name="comment_id" value="<?= $c['id']; ?>">
                                    </form>
                                </li>
                            <?php else: ?>
                                <li><a class="btn copyComment dropdown-item"><i class="fas fa-copy"></i> Copy</a></li>
                                <li><button class="btn dropdown-item reportComment"><i class="fas fa-flag"></i> Report</button></li>
                                <li>
                                    <form action="delete_comment.php" method="post" class="delCommentForm">
                                        <button type="button" class="deleteComment btn dropdown-item"><i class="fas fa-trash"></i> Delete</button>
                                        <input type="hidden" name="photo_id" value="<?= $c['photo_id']; ?>">
                                        <input type="hidden" name="comment_id" value="<?= $c['id']; ?>">
                                    </form>
                                </li>
                            <?php endif; ?>
                        </ul>
                    </div>
                </div>
            </div>
        </li>
    <?php endforeach; ?>
</ul>
<?php if ($comments->rowCount() <= 0): ?>
    <div class="mt-2 mb-2 text-center">
        <i style="opacity: calc(0.8);color:#444;font-size:medium;">No comments yet — be the first to comment!</i>
    </div>
<?php endif; ?>
<script>
    document.querySelectorAll('.comment-item').forEach(item => {
        const editComment = item.querySelector('.editComment');
        const displayDiv = item.querySelector('.display-div');
        const editDiv = item.querySelector('.edit-div');
        const save = item.querySelector('.saveChange');
        const reset = item.querySelector('.resetChange');
        const menu = item.querySelector('.menuBtn');
        const form = item.querySelector('.upCommentForm');
        const delForm = item.querySelector('.delCommentForm');
        const delButton = item.querySelector('.deleteComment');
        editDiv.classList.add('d-none');
        save.classList.add('d-none');
        reset.classList.add('d-none');

        if (!editComment) return;
        editComment.addEventListener('click', () => {
            displayDiv.classList.toggle("d-none");
            editDiv.classList.toggle("d-none");
            menu.classList.add("d-none");
            save.classList.toggle("d-none");
            reset.classList.toggle("d-none");
        });

        reset.addEventListener('click', () => {
            displayDiv.classList.toggle('d-none');
            editDiv.classList.toggle('d-none');
            menu.classList.toggle('d-none');
            save.classList.toggle('d-none');
            reset.classList.toggle('d-none');
        });

        save.addEventListener('click', () => {
            form.submit();
        });

        delButton.addEventListener('click',()=>{
            delForm.submit();
        });
    });
</script>