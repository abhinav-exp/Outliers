# Generated by Django 3.2.7 on 2021-09-15 06:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0005_alter_notice_text'),
    ]

    operations = [
        migrations.RenameField(
            model_name='students',
            old_name='branch',
            new_name='passwd',
        ),
    ]
