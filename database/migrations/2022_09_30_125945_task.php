<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Query\Expression;
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
        Schema::create('tasks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('parent_id')->default(0);
            $table->foreignUuid('project_id')->references('id')->on('projects')->onDelete('cascade');;
            $table->string('title');
            $table->longText('content');
            $table->enum('status', ['Backlog', 'Development', 'In Progress', 'Done'])->default('Backlog');
            $table->enum('issue_type', array('Task', 'Bug', 'Research'))->default('Task');
            $table->enum('priority', ['Low', 'Medium', 'High'])->default('Medium');
            $table->decimal('hours_spent', 12)->default(0.00);
            $table->foreignUuid('creator')->references('id')->on('users');
            $table->json('assigned_to')->default(new Expression('(JSON_ARRAY())'));
            $table->timestamps();
            $table->softDeletes();
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
        Schema::dropIfExists('tasks');
    }
};