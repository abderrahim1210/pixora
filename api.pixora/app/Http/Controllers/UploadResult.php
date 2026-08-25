<?php

namespace App\Http\Controllers;

use App\Models\PaymentSetting;
use App\Models\Photo;
use App\Models\User;
use App\Models\Wallet;
use App\Notifications\AlertGoToPay;
use Illuminate\Http\Middleware\TrustProxies;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

use function Symfony\Component\Clock\now;

class UploadResult extends Controller
{
    public function uploadResult(Request $request)
    {
        $image = $request->image;
        $photoId = $request->photo_id;
        $ownerId = $request->ownerId;
        $requester_id = $request->requester_id;
        $req_id = $request->req_id;
        $task_id = $request->task_id;
        $editor_id = Auth::id();
        $user = User::find($editor_id);

        if ($user->role !== 'editor') {
            return response()->json([
                'success' => false,
                'message' => 'You not have a permission for do it this action'
            ], 403);
        }

        $check = new \App\Http\Controllers\ValideImage();
        $valide = $check->valide($image);

        $basePrice = 50;
        $platformFee = 5;
        $totalAmount = $basePrice + $platformFee;


        if ($valide) {
            try {
                $photo = Photo::find($photoId);
                $requester = User::find($requester_id);
                $upload = new \App\Http\Controllers\CloudinaryActions();
                $res = $upload->upload($image, 'pixora_photos');
                $payment_owner_account = PaymentSetting::where('user_id', $requester_id)->first();
                $imageUrl = $res['image_url'];
                DB::table('images')->insert([
                    'path' => $imageUrl,
                    'owner_id' => $ownerId,
                    'parent_id' => $photoId,
                    'request_id' => $req_id,
                    'status' => 'accepted',
                    'created_at' => now(),
                    'editor_id' => $editor_id,
                    'is_paid' => false,
                ]);

                DB::table('editing_tasks')->where('id', $task_id)->update([
                    'status' => 'completed',
                    'edited_file_url' => $imageUrl,
                    'updated_at' => now()
                ]);

                $transaction_id = "TEST_TXN_" . uniqid();

                DB::table('payments')->insert([
                    'request_id' => $req_id,
                    'user_id' => $ownerId,
                    'amount' => $totalAmount,
                    'payment_method' => $payment_owner_account->method_type,
                    'transaction_id' => $transaction_id,
                    'status' => 'pending',
                    'created_at' => now(),
                    'payment_account_id' => $payment_owner_account->id
                ]);

                // Wallet::create([
                //     'user_id' => $editor_id,
                //     'balance' => env('EDITOR_AMOUNT')
                // ]);

                $wallet = Wallet::firstOrCreate(['user_id' => $editor_id]);
                $wallet->increment('balance',env('EDITOR_AMOUNT'));

                $requester->notify(new AlertGoToPay($photo, $transaction_id, $req_id));

                return response()->json([
                    'success' => true,
                    'message' => 'Photo uploaded result successfully'
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => "Error in " . $e
                ]);
            }
        }
    }
}
