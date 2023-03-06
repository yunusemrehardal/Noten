﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NotenApi.Data;

#nullable disable

namespace NotenApi.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230306141954_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("NotenApi.Data.Note", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.HasKey("Id");

                    b.ToTable("Notes");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Content = "Milk, Bread, Eggs",
                            Title = "Grocery List"
                        },
                        new
                        {
                            Id = 2,
                            Content = "Buy tickets, Make hotel reservations",
                            Title = "Travel Plans"
                        },
                        new
                        {
                            Id = 3,
                            Content = "Schedule doctor's appointment, Read a book",
                            Title = "To-Do List"
                        },
                        new
                        {
                            Id = 4,
                            Content = "Develop a mobile app, Create AI applications",
                            Title = "Project Ideas"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
