<?php

declare(strict_types=1);

namespace Sven\DasConsent\Subscriber;

use Shopware\Storefront\Event\StorefrontRenderEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Shopware\Core\System\SystemConfig\SystemConfigService;

class FrontendSubscriber implements EventSubscriberInterface
{
    private SystemConfigService $systemConfigService;

    public function __construct(SystemConfigService $systemConfigService)
    {
        $this->systemConfigService = $systemConfigService;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            StorefrontRenderEvent::class => 'onStorefrontRender'
        ];
    }

    public function onStorefrontRender(StorefrontRenderEvent $event): void
    {
        $salesChannelId = $event->getSalesChannelContext()->getSalesChannelId();

        // Fetch the correct settings from the plugin config
        $cookieOverlayActive = (bool) $this->systemConfigService->get(
            'SvenDasConsent.config.show', 
            $salesChannelId
        );

        $cookieWallActive = (bool) $this->systemConfigService->get(
            'SvenDasConsent.config.cookieWall', 
            $salesChannelId
        );

        // Set the variables separately
        $event->setParameter('dasConsent', $cookieOverlayActive);
        $event->setParameter('cookieWall', $cookieWallActive);
    }
}
