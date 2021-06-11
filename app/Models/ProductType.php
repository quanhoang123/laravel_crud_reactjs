<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductType extends Model
{
    protected $table = 'type_products';

    protected $fillabel = ['name','desciption', 'image'];

    public $timestamp = true;

    public function products(){
        return $this->hasMany('App\Product' , 'id_type' ,'id');
    }
}
