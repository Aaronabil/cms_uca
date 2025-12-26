<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;

class SystemGuideOverview extends Widget
{
    protected string $view = 'filament.widgets.system-guide-overview';
    
    protected int | string | array $columnSpan = 'full';
    
    protected static ?int $sort = 2;
}
