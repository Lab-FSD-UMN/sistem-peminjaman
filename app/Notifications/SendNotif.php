<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use NotificationChannels\Fcm\FcmChannel;
use NotificationChannels\Fcm\FcmMessage;
use NotificationChannels\Fcm\Resources\Notification as FcmNotification;


class SendNotif extends Notification
{

    protected $title;
    protected $body;

    public function __construct($title = null, $body = null)
    {
        $this->title = $title ?? 'Default Title';
        $this->body = $body ?? 'Default Body';
    }
    public function via($notifiable)
    {
        return [FcmChannel::class];
    }

    public function toFcm(
        $notifiable,
    ): FcmMessage {
        return (new FcmMessage(notification: new FcmNotification(
            // title: 'Account Activated',
            // body: 'Your account has been activated.',
            // image: 'http://example.com/url-to-image-here.png'
            title: $this->title,
            body: $this->body,
        )))
            ->data(['data1' => 'value', 'data2' => 'value2'])
            ->custom([
                'android' => [
                    'notification' => [
                        'color' => '#0A0A0A',
                    ],
                    'fcm_options' => [
                        'analytics_label' => 'analytics',
                    ],
                ],
                'apns' => [
                    'fcm_options' => [
                        'analytics_label' => 'analytics',
                    ],
                ],
            ]);
    }
}
