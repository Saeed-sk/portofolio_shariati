<?php

namespace App\View\Components;

use App\Models\Link;
use App\Models\Section;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class MenuComponent extends Component
{
    /**
     * Create a new component instance.
     */
    public ?Section $info;
    public \Illuminate\Database\Eloquent\Collection $links;
    public \Illuminate\Database\Eloquent\Collection $titles;
    public bool $showInfo;

    public function __construct($showInfo = true)
    {
        $this->showInfo = $showInfo;
        $this->info = Section::query()->where('template', 'info')->with('images')->first();
        $this->links = Link::query()->where('template', 'info')->get();
        $this->titles = Section::query()->where('template', 'single')->orWhere('template', 'multiple')->get(['title', 'id']);
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.menu-component');
    }
}
