<?php if (!empty($_SESSION['flash']) && is_array($_SESSION['flash'])): ?>
    <?php foreach ($_SESSION['flash'] as $n): ?>
        <script>
            <?php if ($n['type'] === 'info'): ?>
                notyf.open({
                    type: 'info',
                    message: <?= json_encode($n['message']); ?>
                });
            <?php else: ?>
                notyf[<?= json_encode($n['type']); ?>](<?= json_encode($n['message']); ?>);
            <?php endif; ?>
        </script>
    <?php endforeach; ?>
    <?php unset($_SESSION['flash']);
    ?>
<?php endif; ?>