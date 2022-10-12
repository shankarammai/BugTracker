<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('projects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('parent_id')->default(0);
            $table->uuid('creator');
            $table->string('title');
            $table->text('description', 65535);
            $table->decimal('budget', 12)->default(0.00);
            $table->timestamp('due_date')->default(null);
            $table->enum('status', ["Not Started", "Started", "On Progress", "Completed"])->default("Not Started");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::drop("projects");
    }
};