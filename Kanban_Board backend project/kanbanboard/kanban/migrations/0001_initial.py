# Generated by Django 4.2.3 on 2023-07-21 12:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Board',
            fields=[
                ('board_id', models.IntegerField(primary_key=True, serialize=False)),
                ('board_name', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'board',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(blank=True, max_length=255, null=True)),
                ('email', models.CharField(blank=True, max_length=255, null=True)),
                ('password', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'user',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='List',
            fields=[
                ('column_id', models.IntegerField(primary_key=True, serialize=False)),
                ('column_name', models.CharField(blank=True, max_length=255, null=True)),
                ('board', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='kanban.board')),
            ],
            options={
                'db_table': 'list',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Card',
            fields=[
                ('card_id', models.AutoField(primary_key=True, serialize=False)),
                ('task_name', models.CharField(blank=True, max_length=255, null=True)),
                ('priority', models.CharField(blank=True, max_length=255, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('summary', models.TextField(blank=True, null=True)),
                ('acceptance_criteria', models.TextField(blank=True, null=True)),
                ('start_date', models.DateField(blank=True, null=True)),
                ('due_date', models.DateField(blank=True, null=True)),
                ('issue_type', models.CharField(blank=True, max_length=255, null=True)),
                ('story_points', models.IntegerField(blank=True, null=True)),
                ('status', models.CharField(blank=True, max_length=255, null=True)),
                ('assignee', models.ForeignKey(blank=True, db_column='assignee', null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='card_assignee_set', to='kanban.user')),
                ('column', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='kanban.list')),
                ('reporter', models.ForeignKey(blank=True, db_column='reporter', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='kanban.user')),
            ],
            options={
                'db_table': 'card',
                'managed': True,
            },
        ),
        migrations.AddField(
            model_name='board',
            name='created_by',
            field=models.ForeignKey(blank=True, db_column='created_by', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='kanban.user'),
        ),
    ]
