# Generated by Django 4.0 on 2022-01-07 23:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user_auth', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default=0, max_length=500)),
                ('short_code', models.CharField(default=0, max_length=500, unique=True)),
                ('document', models.FileField(blank=True, null=True, upload_to='products/')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_auth.user')),
            ],
        ),
    ]
