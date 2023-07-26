
from django.db import models


class Board(models.Model):
    board_id = models.IntegerField(primary_key=True)
    board_name = models.CharField(max_length=255, blank=True, null=True)
    created_by = models.ForeignKey('User', models.DO_NOTHING, db_column='created_by', blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'board'


class Card(models.Model):
    card_id = models.AutoField(primary_key=True)
    task_name = models.CharField(max_length=255, blank=True, null=True)
    priority = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    summary = models.TextField(blank=True, null=True)
    reporter = models.ForeignKey('User', models.DO_NOTHING, db_column='reporter', blank=True, null=True)
    assignee = models.ForeignKey('User', models.DO_NOTHING, db_column='assignee', related_name='card_assignee_set', blank=True, null=True)
    acceptance_criteria = models.TextField(blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    column = models.ForeignKey('List', models.DO_NOTHING, blank=True, null=True)
    issue_type = models.CharField(max_length=255, blank=True, null=True)
    story_points = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'card'


class List(models.Model):
    column_id = models.IntegerField(primary_key=True)
    column_name = models.CharField(max_length=255, blank=True, null=True)
    board = models.ForeignKey(Board, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'list'


class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'user'
