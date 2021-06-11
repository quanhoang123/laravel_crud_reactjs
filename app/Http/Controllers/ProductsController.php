<?php

namespace App\Http\Controllers;
use App\Models\ProductType;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class ProductsController extends Controller
{
    private $status = 200;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getType()
    {
        $_product = ProductType::select('id', 'name')->get();
        echo json_encode($_product);
    }
    public function index()
    {
        $product = Products::join('type_products', 'products.id_type', '=', 'type_products.id')
        ->select('products.*', 'type_products.name as type')
        ->orderByDesc('id')
        ->get();
        return response()->json($product);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('welcome');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $product = new Products;
        $product = $request->input('name');     
        $product = $request->input('id_type');    
        $product = $request->input('desctiption');
        $product = $request->input('unit_price');
        $product = $request->input('promotion_price');
        $product = $request->input('unit');
        $product = $request->input('new');
        if ($request->hasFile('image')) {
            $file_name=$request->file('image')->getClientOriginalName();
            $product->image = $file_name;
            $request->file('image')->move('source/image/public/',$file_name);
        }
        
        $product = Products::create($request->all());
        return response()->json(['message' => 'product created',
            'product' => $product]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function show(Products $products)
    {
        return $products;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function edit(Products $products)
    {
        $products = Products::find($id);
        if (! $products) {
            return response()
            ->json(['error' => 'The product is not exists']);
        }
        return response()
            ->json($products);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,Products $product)
    {

        // $product = $request->input('name');     
        // $product = $request->input('id_type');    
        // $product = $request->input('description');
        // $product = $request->input('unit_price');
        // $product = $request->input('promotion_price');
        // $product = $request->input('unit');
        // $product = $request->input('new');

        if ($request->hasFile('image')) {
            $file_name=$request->file('image')->getClientOriginalName();
            $product->image = $file_name;
            $request->file('image')->move('source/image/public/',$file_name);
        }

        $product->name = $request->name;
        $product->id_type = $request->id_type;
        $product->image = $request->image;
        $product->unit_price = $request->unit_price;
        $product->unit = $request->unit;
        $product->new = $request->new;
        $product->description = $request->description;
        $product->save();




        // $product = Products::update($request->all());
        // $product->save();
        return response()->json(['message' => 'product created',
            'product' => $product]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function destroy(Products $product)
    {
        $product->delete();
        return response()->json([
            'message' => 'expense deleted'
        ]);
    }
}
