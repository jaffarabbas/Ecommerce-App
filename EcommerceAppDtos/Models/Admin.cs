using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAppServices.Models;

[Table("ADMIN")]
public partial class Admin
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    [StringLength(100)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    [Column("password")]
    [StringLength(233)]
    [Unicode(false)]
    public string Password { get; set; } = null!;

    [Column("image", TypeName = "text")]
    public string Image { get; set; } = null!;

    [Required]
    [Column("ac_status")]
    public bool? AcStatus { get; set; }
}
