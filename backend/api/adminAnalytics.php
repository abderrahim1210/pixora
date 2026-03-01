<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");
require_once __DIR__."/../config/db.php";

$id = intval($_SESSION['px_id'] ?? 0);

if (!$id){
    echo json_encode(['success' => false,'message' => 'User notd found']);
    return;
}

$get_user = $conn -> prepare('SELECT * FROM users WHERE id = :id');
$get_user->bindValue(':id',$id,PDO::PARAM_INT);
$get_user->execute();
$user = $get_user->fetch(PDO::FETCH_ASSOC);

if (!$user){
    echo json_encode(['success' => false,'message' => 'User not found']);
    return;
}

if ($user['role'] === "user"){
    echo json_encode(['success' => false,'message' => 'You have not a privillages for this site']);
    return;
}

$stm = $conn -> prepare('SELECT COUNT(*) FROM users');
$stm -> execute();
$users = $stm -> fetchColumn();

$stmt = $conn -> prepare('SELECT COUNT(*) FROM photos');
$stmt -> execute();
$photosCount = $stmt->fetchColumn();

$p_a = $conn->prepare('SELECT COUNT(*) FROM photos WHERE status = "approved"');
$p_a -> execute();
$photos_approved = $p_a -> fetchColumn();

$ps = $conn->prepare('SELECT * FROM photos WHERE type = "licensed" AND status = "pending"');
$ps -> execute();
$photos_under_review = $ps -> fetchAll(PDO::FETCH_ASSOC);

$t_p = $conn->prepare('SELECT * FROM users u JOIN photos p ON u.id = p.user_id WHERE status = "approved" GROUP BY user_id');
$t_p -> execute();
$top_photographers = $t_p -> fetchAll(PDO::FETCH_ASSOC);

$p_as = $conn->prepare('SELECT * FROM photos WHERE status = "approved"');
$p_as -> execute();
$photos_approveds = $p_as->fetchAll(PDO::FETCH_ASSOC);

$u_m = $conn->prepare("SELECT * FROM users WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE()) ORDER BY created_at DESC LIMIT 4");
$u_m -> execute();
$users_this_month = $u_m->fetchAll(PDO::FETCH_ASSOC);

$p_w = $conn->prepare("SELECT * FROM photos WHERE upload_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)");
$p_w -> execute();
$photos_thisWeek = $p_w -> fetchAll(PDO::FETCH_ASSOC);

$t_u = $conn->prepare("SELECT u.*, COUNT(p.id) as totalUploads FROM users u JOIN photos p ON u.id = p.user_id GROUP BY p.user_id ORDER BY totalUploads DESC LIMIT 5");
$t_u -> execute();
$top_uploads = $t_u ->  fetchAll(PDO::FETCH_ASSOC);

$m_p = $conn->prepare("SELECT * FROM photos p JOIN comments c ON p.id = c.photo_id GROUP BY c.photo_id ORDER BY c.id DESC LIMIT 4");
$m_p -> execute();
$most_commentsPhotos = $m_p -> fetchAll(PDO::FETCH_ASSOC);

$t_c = $conn -> prepare("SELECT COUNT(*) FROM comments");
$t_c -> execute();
$total_comments = $t_c->fetchColumn();

echo json_encode(['success' => true,
    'users_count' => $users,
    'photos_count' => $photosCount,
    'photos_approved' => $photos_approved,
    'photos_under_review' => $photos_under_review,
    'top_photographers' => $top_photographers,
    'photos_approveds' => $photos_approveds,
    'users_this_month' => $users_this_month,
    'photos_this_week' => $photos_thisWeek,
    'top_uploads' => $top_uploads,
    'most_comments' => $most_commentsPhotos,
    'total_comments' => $total_comments
]);