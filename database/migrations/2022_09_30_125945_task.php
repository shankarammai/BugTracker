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
            $table->foreignUuid('project_id')->references('id')->on('projects');
            $table->string('title');
            $table->longText('content');
            $table->enum('status', ['new', 'opened', 'in_work', 'need_feedback', 'closed', 'not_actual', 'realized', 'rework'])->default('new');
            $table->enum('issue_type', array('task', 'bug', 'research'))->default('task');
            $table->enum('priority',['Low','Medium','High'])->default('Medium');
            $table->decimal('hours_spent', 12)->default(0.00);
            $table->integer('creator');
            $table->json('assigned_to')->default(new Expression('(JSON_ARRAY())'));
                        
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
        Schema::dropIfExists('tasks');    
    }
};