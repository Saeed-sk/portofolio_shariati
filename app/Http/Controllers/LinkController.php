<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LinkController extends Controller
{
    protected function validate(Request $request)
    {
        return $request->validate([
            'template' => 'required|in:info',
            'type' => 'required|in:phone,email,link,social',
            'name' => 'required|string|max:255',
            'url' => 'required|string|max:255',
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $links = Link::query()->where('template', 'menu')->get()->toArray();
        return Inertia::render('Admin/links/links', ['links' => $links]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Link $link)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Link $link)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Link $link)
    {
        $validated = $this->validate($request);
        $link->update($validated);

        if ($link['template'] == 'info') {
            return to_route('info.index');
        } else {
            return to_route('links.menu.get');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Link $link)
    {
        //
    }
}
